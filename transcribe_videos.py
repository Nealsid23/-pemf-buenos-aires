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

# Core dependencies
try:
    import whisper
except ImportError:
    whisper = None

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
            '-of', 'default=noprint_wrappers=1',
            str(file_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)

        # Parse output like: duration=123.45\n
        output = result.stdout.strip()
        if 'duration=' in output:
            duration_seconds = float(output.split('=')[1])
        else:
            raise ValueError(f"Could not parse duration from ffprobe output: {output}")

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

def create_transcript_json(transcript_data):
    """
    Create formatted JSON string from transcript data with speaker info.

    Args:
        transcript_data: dict with transcript information

    Returns:
        str: JSON formatted string
    """
    output = {
        'fecha': transcript_data['fecha'],
        'archivo_original': transcript_data['archivo_original'],
        'duracion_segundos': transcript_data['duracion_segundos'],
        'duracion_formateada': transcript_data['duracion_formateada'],
        'modelo_whisper': transcript_data['modelo_whisper'],
        'idioma': transcript_data['idioma'],
        'diarization_habilitada': transcript_data.get('diarization_habilitada', True),
        'speakers_detectados': transcript_data.get('speakers_detectados', []),
        'diálogo': transcript_data.get('diálogo', []),
        'transcripcion_completa': transcript_data.get('transcripcion_completa', ''),
        'timestamp_procesamiento': transcript_data['timestamp_procesamiento'],
        'estado': transcript_data['estado'],
        'notas': transcript_data['notas']
    }

    return json.dumps(output, ensure_ascii=False, indent=2)

def save_transcript(output_folder, date_str, original_filename, json_content):
    """
    Save transcript JSON to file.

    Args:
        output_folder: Path where to save transcripts
        date_str: Date string from filename
        original_filename: Original video filename
        json_content: JSON string content

    Returns:
        Path: Path to saved file
    """
    output_folder = Path(output_folder)
    output_folder.mkdir(parents=True, exist_ok=True)

    base_name = os.path.splitext(original_filename)[0]
    output_filename = f"{base_name}.json"
    output_path = output_folder / output_filename

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(json_content)

    return output_path

def validate_video_file(file_path):
    """
    Validate that a file is a readable video file.

    Args:
        file_path: Path to file to validate

    Returns:
        bool: True if file is valid

    Raises:
        ValueError: If file fails any validation check
    """
    file_path = Path(file_path)

    if not file_path.exists():
        raise ValueError(f"File not found: {file_path}")

    if not file_path.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    if file_path.suffix.lower() not in SUPPORTED_FORMATS:
        raise ValueError(f"Unsupported format: {file_path.suffix}")

    if file_path.stat().st_size == 0:
        raise ValueError(f"File is empty: {file_path}")

    return True

def create_error_json(file_path, date_str, error_message):
    """
    Create JSON output for failed transcription.

    Args:
        file_path: Path to the video file
        date_str: Date string from filename
        error_message: Error message to include in output

    Returns:
        dict: Error JSON structure with estado='error'
    """
    try:
        duration_seconds, duration_formatted = get_audio_duration(file_path)
    except:
        duration_seconds, duration_formatted = 0, "0:00:00"

    return {
        'fecha': date_str,
        'archivo_original': Path(file_path).name,
        'duracion_segundos': duration_seconds,
        'duracion_formateada': duration_formatted,
        'modelo_whisper': WHISPER_MODEL,
        'idioma': WHISPER_LANGUAGE,
        'diarization_habilitada': True,
        'speakers_detectados': [],
        'diálogo': [],
        'transcripcion_completa': '',
        'timestamp_procesamiento': datetime.now().isoformat(),
        'estado': 'error',
        'notas': error_message
    }

def process_single_file(file_path, output_folder, logger):
    """
    Process a single video file: diarize, transcribe, merge, save JSON.

    Returns:
        bool: True if successful, False if failed
    """
    try:
        validate_video_file(file_path)
        date_str, description = parse_filename(file_path.name)

        logger.info(f"Processing: {file_path.name}")

        # Step 1: Get duration
        duration_seconds, duration_formatted = get_audio_duration(file_path)

        # Step 2: Extract frames for OCR
        logger.info("Extracting video frames for OCR...")
        frames = extract_frames(file_path)

        # Step 3: Perform OCR on frames
        logger.info("Running OCR to detect speaker names...")
        ocr_text_dict = detect_text_in_frames(frames, logger)

        # Step 4: Perform diarization
        logger.info("Running speaker diarization...")
        diarization_segments = perform_diarization(file_path, logger)

        # Step 5: Match speaker names
        speaker_names = match_speaker_names(ocr_text_dict, diarization_segments, logger)

        # Step 6: Transcribe with Whisper
        logger.info("Running Whisper transcription...")
        whisper_result = transcribe_with_whisper(file_path, logger)

        # Step 7: Merge transcription with diarization
        dialogue = merge_transcription_with_diarization(
            whisper_result, diarization_segments, speaker_names
        )

        # Step 8: Create theater-format text
        theater_text = create_theater_format_text(dialogue)

        # Step 9: Build speakers list for JSON
        speakers_list = [
            {
                'speaker_id': sid,
                'nombre': sname,
                'fuente': 'ocr' if any(ocr_text for ocr_text in ocr_text_dict.values() if sname in ocr_text) else 'diarization'
            }
            for sid, sname in speaker_names.items()
        ]

        # Step 10: Create transcript data
        transcript_data = {
            'fecha': date_str,
            'archivo_original': file_path.name,
            'duracion_segundos': duration_seconds,
            'duracion_formateada': duration_formatted,
            'modelo_whisper': WHISPER_MODEL,
            'idioma': WHISPER_LANGUAGE,
            'diarization_habilitada': True,
            'speakers_detectados': speakers_list,
            'diálogo': dialogue,
            'transcripcion_completa': theater_text,
            'timestamp_procesamiento': datetime.now().isoformat(),
            'estado': 'success',
            'notas': ''
        }

        # Step 11: Generate and save JSON
        json_content = create_transcript_json(transcript_data)
        output_path = save_transcript(output_folder, date_str, file_path.name, json_content)

        logger.info(f"[OK] Transcript saved: {output_path}")
        return True

    except Exception as e:
        logger.error(f"[ERROR] Failed to process {file_path.name}: {e}")

        try:
            date_str, _ = parse_filename(file_path.name)
        except:
            date_str = datetime.now().strftime('%Y-%m-%d')

        error_data = create_error_json(file_path, date_str, str(e))
        error_json = create_transcript_json(error_data)

        try:
            save_transcript(output_folder, date_str, file_path.name, error_json)
        except:
            pass

        return False

def process_all_videos(input_folder, output_folder):
    """Process all video files in input folder."""
    input_folder = Path(input_folder)
    output_folder = Path(output_folder)

    log_path = input_folder / 'transcription.log'
    logger = setup_logging(log_path)

    logger.info("=" * 80)
    logger.info(f"Whisper Transcription Automator with Speaker Diarization v{SCRIPT_VERSION}")
    logger.info(f"Start time: {datetime.now().isoformat()}")
    logger.info(f"Input folder: {input_folder}")
    logger.info(f"Output folder: {output_folder}")
    logger.info(f"Model: {WHISPER_MODEL} | Language: {WHISPER_LANGUAGE}")
    logger.info(f"Features: Speaker Diarization + OCR Name Detection")
    logger.info("=" * 80)

    try:
        video_files = find_video_files(input_folder)

        if not video_files:
            logger.warning(f"No video files found in {input_folder}")
            return

        logger.info(f"Found {len(video_files)} video file(s) to process")

        successful = 0
        failed = 0

        for idx, video_file in enumerate(video_files, 1):
            logger.info(f"\n[{idx}/{len(video_files)}] Processing...")

            success = process_single_file(video_file, output_folder, logger)

            if success:
                successful += 1
            else:
                failed += 1

        logger.info("\n" + "=" * 80)
        logger.info(f"Processing Complete")
        logger.info(f"Successful: {successful}/{len(video_files)}")
        logger.info(f"Failed: {failed}/{len(video_files)}")
        logger.info(f"Output folder: {output_folder}")
        logger.info(f"Log file: {log_path}")
        logger.info("=" * 80)

    except Exception as e:
        logger.error(f"Fatal error: {e}", exc_info=True)
        sys.exit(1)

if __name__ == '__main__':
    INPUT_FOLDER = r'C:\Users\neals\Downloads\inmuno'
    OUTPUT_FOLDER = r'C:\Users\neals\Downloads\inmuno\transcripts'

    process_all_videos(INPUT_FOLDER, OUTPUT_FOLDER)
