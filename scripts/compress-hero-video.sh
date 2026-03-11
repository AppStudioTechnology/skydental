#!/usr/bin/env bash
# Compress hero video for web: ~1.5 Mbps, 1080p, faststart for streaming.
# Requires ffmpeg: brew install ffmpeg

set -e
VIDEO_DIR="public/assets/videos"
INPUT="$VIDEO_DIR/hero-video.mp4"
BACKUP="$VIDEO_DIR/hero-video.mp4.backup"
OUTPUT="$VIDEO_DIR/hero-video-compressed.mp4"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Video not found: $INPUT"
  exit 1
fi

echo "Original size: $(du -h "$INPUT" | cut -f1)"
cp "$INPUT" "$BACKUP"
echo "Backup saved to $BACKUP"

# Target ~1.5 Mbps video, 128k audio; scale to max 1080p; faststart for web streaming
ffmpeg -y -i "$INPUT" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -maxrate 1.5M \
  -bufsize 3M \
  -vf "scale=min(1920\,iw):min(1080\,ih):force_original_aspect_ratio=decrease" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  "$OUTPUT"

mv "$OUTPUT" "$INPUT"
echo "Compressed video replaced $INPUT"
echo "New size: $(du -h "$INPUT" | cut -f1)"
echo "To restore original: mv $BACKUP $INPUT"
