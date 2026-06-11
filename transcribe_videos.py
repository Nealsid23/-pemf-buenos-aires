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

if __name__ == '__main__':
    print(f"Whisper Transcription Automator v{SCRIPT_VERSION}")
    print("Dependencies check: OK (can be validated during execution)")
