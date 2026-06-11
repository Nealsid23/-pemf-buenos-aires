# Whisper Video Transcription Automator with Speaker Diarization

Automatically transcribes video files (m4a, mp4) using OpenAI Whisper with **speaker diarization and OCR name detection**, generating theater-style JSON transcripts.

## Prerequisites

- Python 3.8+
- ffmpeg
- openai-whisper
- pyannote.audio
- pytesseract
- tesseract-ocr (system binary)
- opencv-python

Install Python packages with:
```powershell
pip install openai-whisper pyannote.audio pytesseract opencv-python
```

Install tesseract-ocr (Windows):
```powershell
choco install tesseract -y
```

Or download from: https://github.com/UB-Mannheim/tesseract/wiki

## Usage

```powershell
cd C:\Users\neals
python transcribe_videos.py
```

## File Organization

### Input
- **Location:** `C:\Users\neals\Downloads\inmuno\`
- **Supported formats:** `.m4a`, `.mp4`
- **Required naming:** `YYYY-MM-DD-description.ext`
- **Example:** `2024-06-11-PEMF-biohacking.m4a`

### Output
- **Location:** `C:\Users\neals\Downloads\inmuno\transcripts\`
- **Format:** JSON files with theater-style dialogue
- **Log file:** `transcription.log` (in input folder)

## Output JSON Format

Each transcript JSON file contains:
```json
{
  "fecha": "2024-06-11",
  "archivo_original": "2024-06-11-PEMF-biohacking.m4a",
  "duracion_segundos": 8130,
  "duracion_formateada": "2:15:30",
  "modelo_whisper": "large",
  "idioma": "es",
  "diarization_habilitada": true,
  "speakers_detectados": [
    {
      "speaker_id": "speaker_00",
      "nombre": "Juan",
      "fuente": "ocr"
    }
  ],
  "diálogo": [
    {
      "id": 0,
      "inicio": 0.0,
      "fin": 5.5,
      "speaker_id": "speaker_00",
      "speaker_nombre": "Juan",
      "texto": "Texto del diálogo aquí"
    }
  ],
  "transcripcion_completa": "Juan: Texto del diálogo aquí\n...",
  "timestamp_procesamiento": "2024-06-11T15:30:45",
  "estado": "success",
  "notas": ""
}
```

## Features

- **Speaker Diarization:** Automatically detects and separates different speakers
- **OCR Name Detection:** Reads speaker names from video overlay text
- **Theater-Style Output:** Dialogue formatted as "Speaker: text"
- **Spanish Language:** Optimized for Spanish audio transcription
- **Error Handling:** Graceful error JSON output for failed transcriptions
- **Comprehensive Logging:** Detailed processing logs in `transcription.log`

## Performance Notes

- Processing time: ~30-45 minutes per 2-hour video (varies with hardware)
- Requires significant CPU/GPU resources
- Diarization and OCR are computationally intensive
- With GPU acceleration: ~15-30 minutes per 2-hour video

## Configuration

Edit these constants in `transcribe_videos.py`:
- `WHISPER_MODEL`: Model size (default: 'large' - use 'medium' for faster processing)
- `WHISPER_LANGUAGE`: Language code (default: 'es' for Spanish)
- `INPUT_FOLDER`: Where to find videos
- `OUTPUT_FOLDER`: Where to save transcripts

## Troubleshooting

**"tesseract is not installed"**
- Install tesseract-ocr from https://github.com/UB-Mannheim/tesseract/wiki
- Add to pytesseract config: `pytesseract.pytesseract.pytesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'`

**"No module named 'pyannote'"**
- Run: `pip install pyannote.audio`

**"CUDA not available"**
- Script will fall back to CPU (slower but still works)
- For GPU support, install CUDA and PyTorch with CUDA support

## License

This script uses OpenAI Whisper (MIT License), Pyannote Audio (MIT License), and other open-source tools.
