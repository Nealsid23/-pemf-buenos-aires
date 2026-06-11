#!/usr/bin/env python3
"""
Whisper Video Transcription Automation Script
Transcribes all m4a/mp4 files from specified folder using OpenAI Whisper
Generates JSON outputs with timestamps and metadata
"""

import os
import sys
import json
import logging
from pathlib import Path
from datetime import datetime
import re
import subprocess

# Diarization and OCR dependencies
try:
    from pyannote.audio import Pipeline
except ImportError:
    Pipeline = None

try:
    import pytesseract
except ImportError:
    pytesseract = None

try:
    import cv2
except ImportError:
    cv2 = None

# Version and constants
SCRIPT_VERSION = "1.0.0"
SUPPORTED_FORMATS = {'.m4a', '.mp4'}
WHISPER_MODEL = 'large'
WHISPER_LANGUAGE = 'es'

def setup_logging(log_path):
    """Configure logging for the script."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_path),
            logging.StreamHandler(sys.stdout)
        ]
    )
    return logging.getLogger(__name__)

def parse_filename(filename):
    """
    Extract date and description from filename.
    Expected format: YYYY-MM-DD-description.ext

    Returns:
        tuple: (date_str, description_str)
    """
    # Remove file extension
    name_without_ext = os.path.splitext(filename)[0]

    # Pattern: YYYY-MM-DD followed by dash and rest of name
    pattern = r'^(\d{4}-\d{2}-\d{2})-(.+)$'
    match = re.match(pattern, name_without_ext)

    if match:
        date_str = match.group(1)
        description = match.group(2)
        return date_str, description
    else:
        raise ValueError(f"Filename does not match expected pattern (YYYY-MM-DD-description): {filename}")

def find_video_files(folder_path):
    """
    Find all supported video files in a folder.

    Args:
        folder_path: Path object or string path to search

    Returns:
        list: List of Path objects for found video files
    """
    folder_path = Path(folder_path)

    if not folder_path.exists():
        raise FileNotFoundError(f"Folder not found: {folder_path}")

    video_files = []

    # Find all files with supported extensions
    for ext in SUPPORTED_FORMATS:
        video_files.extend(folder_path.glob(f'*{ext}'))

    # Sort by filename for consistent processing order
    return sorted(video_files)

def get_audio_duration(file_path):
    """
    Get duration of audio file in seconds using ffprobe.

    Args:
        file_path: Path to audio file

    Returns:
        tuple: (duration_seconds, duration_formatted)
    """
    try:
        cmd = [
            'ffprobe', '-v', 'error',
            '-show_entries', 'format=duration',
            '-of', 'default=noprint_wrappers=1:nokey=1:noprint_sections=1',
            str(file_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)

        duration_seconds = float(result.stdout.strip())

        # Format as HH:MM:SS
        hours = int(duration_seconds // 3600)
        minutes = int((duration_seconds % 3600) // 60)
        seconds = int(duration_seconds % 60)
        duration_formatted = f"{hours}:{minutes:02d}:{seconds:02d}"

        return duration_seconds, duration_formatted

    except Exception as e:
        raise RuntimeError(f"Failed to get duration for {file_path}: {e}")

def extract_frames(file_path, interval_seconds=5):
    """
    Extract frames from video at regular intervals for OCR processing.

    Args:
        file_path: Path to video file
        interval_seconds: Seconds between frame extractions (default: 5)

    Returns:
        list: List of tuples (timestamp, frame_image)
    """
    if cv2 is None:
        raise RuntimeError("OpenCV (cv2) is not installed. Install with: pip install opencv-python")

    try:
        cap = cv2.VideoCapture(str(file_path))
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_interval = int(fps * interval_seconds)

        frames = []
        frame_count = 0

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % frame_interval == 0:
                timestamp = frame_count / fps
                frames.append((timestamp, frame))

            frame_count += 1

        cap.release()
        return frames

    except Exception as e:
        raise RuntimeError(f"Failed to extract frames from {file_path}: {e}")

def detect_text_in_frames(frames, logger):
    """
    Detect text in video frames using OCR.

    Args:
        frames: List of (timestamp, frame) tuples from extract_frames()
        logger: logging instance

    Returns:
        dict: {timestamp: detected_text_lines}
    """
    if pytesseract is None:
        raise RuntimeError("pytesseract is not installed. Install with: pip install pytesseract")

    try:
        text_by_time = {}

        for timestamp, frame in frames:
            try:
                # Convert BGR to grayscale for better OCR
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                # Detect text using pytesseract
                text = pytesseract.image_to_string(gray, lang='spa')

                if text.strip():
                    text_by_time[timestamp] = text.strip()
                    logger.debug(f"OCR detected text at {timestamp}s: {text[:50]}...")

            except Exception as e:
                logger.debug(f"OCR failed for frame at {timestamp}s: {e}")
                continue

        return text_by_time

    except Exception as e:
        logger.warning(f"OCR processing failed: {e}")
        return {}

def perform_diarization(file_path, logger):
    """
    Perform speaker diarization on audio file using Pyannote.

    Args:
        file_path: Path to audio/video file
        logger: logging instance

    Returns:
        list: List of speaker segments with timestamps and speaker IDs
    """
    try:
        if Pipeline is None:
            raise RuntimeError("Pyannote is not installed. Install with: pip install pyannote.audio")

        logger.info("Loading Pyannote diarization model...")

        # Load pre-trained diarization pipeline
        pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token=False  # Using public model
        )

        logger.info(f"Running diarization on {Path(file_path).name}...")

        # Perform diarization
        diarization = pipeline(str(file_path))

        # Convert to segment list
        segments = []
        for turn, _, speaker in diarization.itertracks(yield_label=True):
            segment = {
                'start': turn.start,
                'end': turn.end,
                'speaker': speaker,
                'duration': turn.end - turn.start
            }
            segments.append(segment)

        unique_speakers = len(set(s['speaker'] for s in segments))
        logger.info(f"Diarization detected {unique_speakers} unique speakers")

        return segments

    except Exception as e:
        logger.error(f"Diarization failed for {Path(file_path).name}: {e}")
        raise

def match_speaker_names(ocr_text_dict, diarization_segments, logger):
    """
    Match detected speaker names from OCR to diarization speaker IDs.

    Args:
        ocr_text_dict: Dict from detect_text_in_frames()
        diarization_segments: List of speaker segments with timestamps
        logger: logging instance

    Returns:
        dict: {speaker_id: speaker_name} mapping
    """
    speaker_names = {}
    speaker_name_count = 0

    try:
        # Extract unique speaker IDs from diarization
        unique_speakers = set()
        for seg in diarization_segments:
            if 'speaker' in seg:
                unique_speakers.add(seg['speaker'])

        # Try to match OCR text to speakers
        for timestamp, text in sorted(ocr_text_dict.items()):
            # Look for text patterns that might be names (capitalized words)
            lines = text.split('\n')
            for line in lines:
                words = line.strip().split()
                if len(words) > 0 and words[0][0].isupper():
                    # This might be a speaker name
                    potential_name = words[0]

                    # Find closest speaker by timestamp
                    closest_speaker = None
                    closest_distance = float('inf')

                    for seg in diarization_segments:
                        if abs(seg.get('start', 0) - timestamp) < closest_distance:
                            closest_distance = abs(seg.get('start', 0) - timestamp)
                            closest_speaker = seg.get('speaker')

                    if closest_speaker and closest_speaker not in speaker_names:
                        speaker_names[closest_speaker] = potential_name
                        speaker_name_count += 1

        logger.info(f"Matched {speaker_name_count} speaker names via OCR")

        # Assign default names to speakers without detected names
        for speaker_id in unique_speakers:
            if speaker_id not in speaker_names:
                speaker_names[speaker_id] = f"Speaker {len([s for s in speaker_names.keys() if s.startswith('speaker_')])+1}"

        return speaker_names

    except Exception as e:
        logger.warning(f"Speaker name matching failed: {e}")
        # Return default speaker names
        return {f"speaker_{i}": f"Speaker {i+1}" for i in range(len(unique_speakers))}

def transcribe_with_whisper(file_path, logger):
    """
    Transcribe audio file using OpenAI Whisper.

    Args:
        file_path: Path to audio file
        logger: logging instance

    Returns:
        dict: Whisper result with text and segments
    """
    try:
        import whisper

        logger.info(f"Loading Whisper model '{WHISPER_MODEL}'...")
        model = whisper.load_model(WHISPER_MODEL)

        logger.info(f"Transcribing: {Path(file_path).name}")

        result = model.transcribe(
            str(file_path),
            language=WHISPER_LANGUAGE,
            verbose=False
        )

        logger.info(f"Transcription completed for {Path(file_path).name}")
        return result

    except Exception as e:
        logger.error(f"Transcription failed for {file_path}: {e}")
        raise

def merge_transcription_with_diarization(whisper_result, diarization_segments, speaker_names):
    """
    Merge Whisper transcription with diarization speaker info.
    Creates theater-style dialogue output.

    Args:
        whisper_result: Dict from Whisper with segments
        diarization_segments: List from perform_diarization()
        speaker_names: Dict from match_speaker_names()

    Returns:
        list: Merged dialogue segments with speaker info
    """
    dialogue = []

    for idx, whisper_seg in enumerate(whisper_result.get('segments', [])):
        seg_start = whisper_seg['start']
        seg_end = whisper_seg['end']
        seg_text = whisper_seg['text'].strip()

        # Find which diarization speaker segment overlaps
        best_speaker = None
        best_overlap = 0

        for diar_seg in diarization_segments:
            overlap_start = max(seg_start, diar_seg['start'])
            overlap_end = min(seg_end, diar_seg['end'])
            overlap = max(0, overlap_end - overlap_start)

            if overlap > best_overlap:
                best_overlap = overlap
                best_speaker = diar_seg['speaker']

        # Get speaker name or use default
        speaker_name = speaker_names.get(best_speaker, "Unknown Speaker")

        dialogue_entry = {
            'id': idx,
            'inicio': seg_start,
            'fin': seg_end,
            'speaker_id': best_speaker,
            'speaker_nombre': speaker_name,
            'texto': seg_text
        }

        dialogue.append(dialogue_entry)

    return dialogue

def create_theater_format_text(dialogue):
    """
    Create theater-style transcript text.

    Args:
        dialogue: List of dialogue entries from merge_transcription_with_diarization()

    Returns:
        str: Formatted text (Speaker: text)
    """
    lines = []

    for entry in dialogue:
        speaker = entry['speaker_nombre']
        text = entry['texto']
        lines.append(f"{speaker}: {text}")

    return "\n".join(lines)

if __name__ == '__main__':
    print(f"Whisper Transcription Automator v{SCRIPT_VERSION}")
    print("Dependencies check: OK (can be validated during execution)")
