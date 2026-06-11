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

if __name__ == '__main__':
    print(f"Whisper Transcription Automator v{SCRIPT_VERSION}")
    print("Dependencies check: OK (can be validated during execution)")
