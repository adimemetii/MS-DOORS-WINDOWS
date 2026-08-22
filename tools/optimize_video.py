# -*- coding: utf-8 -*-
"""
Optimizes assets/video2.mp4 for the web:
  1. Re-encodes it as a much smaller H.264 MP4 (720p, no audio track,
     faststart so playback starts immediately) -> assets/video2-opt.mp4
  2. Extracts a poster frame                          -> assets/video2-poster.jpg

The original file is left untouched.
"""
import os
import subprocess
import sys

import imageio_ffmpeg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "video2.mp4")
DST = os.path.join(ROOT, "assets", "video2-opt.mp4")
POSTER = os.path.join(ROOT, "assets", "video2-poster.jpg")

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
print("ffmpeg:", ffmpeg)


def run(args):
    print("+", " ".join(args))
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr[-3000:])
        sys.exit(1)
    return result


def probe(path):
    """Return (width, height) using ffprobe-like parsing via ffmpeg itself."""
    # imageio-ffmpeg ships only ffmpeg; parse its stderr banner output by
    # decoding one frame with -f null and reading the reported stream info.
    proc = subprocess.run(
        [ffmpeg, "-hide_banner", "-i", path, "-f", "null", "-"],
        capture_output=True, text=True
    )
    info = proc.stderr
    wh = None
    for line in info.splitlines():
        if "Video:" in line:
            for token in line.split(","):
                token = token.strip()
                if "x" in token and any(c.isdigit() for c in token):
                    parts = token.split(" ")[0]
                    if "x" in parts:
                        try:
                            w, h = parts.split("x")[:2]
                            wh = (int(w), int(h))
                        except ValueError:
                            pass
            break
    return wh


size_mb = lambda p: os.path.getsize(p) / (1024 * 1024)
print(f"source: {SRC} = {size_mb(SRC):.2f} MB")

dims = probe(SRC)
print("dimensions:", dims)

# --- 1. Web-optimized encode -------------------------------------------------
# Scale down to max 1280x720 (keeps aspect), strip audio (background video is
# muted anyway), CRF 29 for a good size/quality balance, faststart moves the
# index to the front so the browser can start playing after ~100 KB.
vf = "scale='min(1280,iw)':-2:flags=bicubic"
run([
    ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
    "-i", SRC,
    "-vf", vf,
    "-c:v", "libx264", "-preset", "slow", "-crf", "29",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    DST,
])
print(f"optimized: {DST} = {size_mb(DST):.2f} MB")

# --- 2. Poster frame ----------------------------------------------------------
# Grab a representative frame at 1 second (or 10% in for very short clips).
run([
    ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
    "-ss", "1", "-i", SRC,
    "-frames:v", "1",
    "-q:v", "4",
    POSTER,
])
print(f"poster: {POSTER} = {os.path.getsize(POSTER) / 1024:.0f} KB")

print("DONE")