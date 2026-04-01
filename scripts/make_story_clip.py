#!/usr/bin/env python3
"""
make_story_clip.py — Turn a raw Shark Tank clip into a story-format TikTok video.

Usage:
  python3 make_story_clip.py <input.mp4> <output.mp4> --story scrub-daddy
  python3 make_story_clip.py <input.mp4> <output.mp4> --custom "Text 1|0-4" "Text 2|4-8"

Stories are defined in STORIES dict below.
"""
import subprocess, sys, argparse, os

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_ITALIC = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# Story scripts: list of (text, start_sec, end_sec, color)
STORIES = {
    "scrub-daddy": [
        ("This sponge made $900,000,000 💰", 0, 4, "white"),
        ("He invented it for his car wash", 4, 7, "white"),
        ("A bidding war broke out on Shark Tank", 7, 11, "white"),
        ("Lori Greiner paid $200K for 20%", 11, 14, "yellow"),
        ("First year: $18 MILLION in sales", 14, 18, "yellow"),
        ("Today: $900M+ and still growing 🧽", 18, 22, "yellow"),
        ("Would YOU have invested? 🦈", 22, 27, "white"),
    ],
    "ring": [
        ("Every shark said NO to this doorbell 🚫", 0, 4, "white"),
        ("He asked for $700K. They laughed.", 4, 8, "white"),
        ("Kevin: No. Barbara: No. Mark: No.", 8, 12, "white"),
        ("He walked out with NOTHING", 12, 16, "white"),
        ("4 years later...", 16, 19, "yellow"),
        ("Amazon paid $1,200,000,000 💀", 19, 24, "yellow"),
        ("Biggest mistake in Shark Tank history?", 24, 28, "white"),
    ],
    "kodiak-cakes": [
        ("These pancakes are worth $1 BILLION 🥞", 0, 4, "white"),
        ("Every shark said no.", 4, 7, "white"),
        ("Mark: out. Kevin: out. Barbara: out.", 7, 11, "white"),
        ("They walked away with nothing", 11, 14, "white"),
        ("Then Target put them on their shelves...", 14, 18, "yellow"),
        ("Revenue: $200M+ 📈", 18, 21, "yellow"),
        ("Valuation: $1 BILLION 🤯", 21, 25, "yellow"),
        ("Would YOU have invested? 🦈", 25, 29, "white"),
    ],
    "lip-bar": [
        ("He called her business a 'disaster' 💄", 0, 4, "white"),
        ("On live TV. In front of millions.", 4, 7, "white"),
        ("Kevin O'Leary: 'This is a DISASTER'", 7, 11, "white"),
        ("Every shark declined.", 11, 14, "white"),
        ("She quit Wall Street for this.", 14, 17, "white"),
        ("2017: She walked into Target...", 17, 21, "yellow"),
        ("1,500 Target stores. 🎯", 21, 24, "yellow"),
        ("Who's the disaster now, Kevin? 🦈", 24, 28, "white"),
    ],
    "pavlok": [
        ("This bracelet SHOCKS you ⚡", 0, 3, "white"),
        ("To break bad habits", 3, 6, "white"),
        ("Kevin O'Leary started losing his mind 😤", 6, 10, "white"),
        ("'This is the most ridiculous thing I've seen'", 10, 14, "white"),
        ("'GET OUT OF MY TANK.' 🚪", 14, 18, "yellow"),
        ("Most chaotic Shark Tank pitch ever 😭", 18, 22, "white"),
        ("Would YOU use it? ⚡🦈", 22, 26, "white"),
    ],
    "spikeball": [
        ("All 5 sharks said NO to this game 🏐", 0, 4, "white"),
        ("'Nobody will play this'", 4, 7, "white"),
        ("They passed.", 7, 10, "white"),
        ("Then college campuses went insane...", 10, 14, "yellow"),
        ("ESPN started covering it as a sport", 14, 18, "yellow"),
        ("Revenue: $50M+ 💰", 18, 21, "yellow"),
        ("Biggest miss in sports history? 🦈", 21, 25, "white"),
    ],
    "uroclub": [
        ("He pitched a golf club... 🏌️", 0, 3, "white"),
        ("...that's secretly a TOILET 🚽", 3, 6, "yellow"),
        ("He demonstrated it on live TV", 6, 9, "white"),
        ("The sharks' faces said everything 😭", 9, 13, "white"),
        ("No deal. Obviously.", 13, 16, "white"),
        ("But would YOU buy one? 🚽🏌️", 16, 20, "white"),
    ],
    "ionic-ear": [
        ("He wanted surgery. In your ear. 🦻", 0, 4, "white"),
        ("Permanent Bluetooth implant", 4, 7, "white"),
        ("'Just a small outpatient procedure'", 7, 11, "white"),
        ("The sharks looked physically ill 😳", 11, 15, "white"),
        ("Every shark declined immediately", 15, 18, "white"),
        ("The first pitch in Shark Tank history.", 18, 22, "yellow"),
        ("Would YOU get the surgery? 🦈⚡", 22, 26, "white"),
    ],
}

def make_drawtext(text, start, end, color, fontsize=65):
    """Generate FFmpeg drawtext filter string."""
    # Escape special chars for FFmpeg
    escaped = text.replace("'", "\\'").replace(":", "\\:").replace("$", "\\$")
    # Split long text into two lines
    words = escaped.split()
    if len(words) > 5:
        mid = len(words) // 2
        line1 = ' '.join(words[:mid])
        line2 = ' '.join(words[mid:])
        return [
            f"drawtext=fontfile='{FONT}':text='{line1}':fontsize={fontsize}:fontcolor={color}:bordercolor=black:borderw=5:x=(w-text_w)/2:y=h*0.08:enable='between(t,{start},{end})'",
            f"drawtext=fontfile='{FONT}':text='{line2}':fontsize={fontsize}:fontcolor={color}:bordercolor=black:borderw=5:x=(w-text_w)/2:y=h*0.08+{fontsize+10}:enable='between(t,{start},{end})'"
        ]
    else:
        return [f"drawtext=fontfile='{FONT}':text='{escaped}':fontsize={fontsize}:fontcolor={color}:bordercolor=black:borderw=5:x=(w-text_w)/2:y=h*0.08:enable='between(t,{start},{end})'"]

def make_story_video(input_file, output_file, story_key=None, custom_texts=None):
    """Create a story-format video with text overlays."""
    if story_key and story_key in STORIES:
        texts = STORIES[story_key]
    elif custom_texts:
        texts = custom_texts
    else:
        print(f"Unknown story: {story_key}. Available: {list(STORIES.keys())}")
        sys.exit(1)

    # Build filter chain
    filters = []
    for text, start, end, color in texts:
        filters.extend(make_drawtext(text, start, end, color))

    vf = ",".join(filters)

    # Get duration
    probe = subprocess.run(
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", input_file],
        capture_output=True, text=True
    )
    duration = float(probe.stdout.strip()) if probe.stdout.strip() else 60

    # Trim to last text end time + 1 second
    max_end = max(t[2] for t in texts) + 1
    trim_duration = min(duration, max_end)

    cmd = [
        "ffmpeg", "-y",
        "-i", input_file,
        "-t", str(trim_duration),
        "-vf", vf,
        "-c:v", "libx264", "-crf", "22", "-preset", "fast",
        "-c:a", "aac", "-b:a", "128k",
        output_file
    ]

    print(f"Creating story video: {story_key or 'custom'}")
    print(f"  Input: {input_file}")
    print(f"  Output: {output_file}")
    print(f"  Duration: {trim_duration:.1f}s")
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        size = os.path.getsize(output_file) / (1024*1024)
        print(f"✅ Done! {size:.1f}MB")
    else:
        print(f"❌ Error: {result.stderr[-500:]}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("input", help="Input video file")
    parser.add_argument("output", help="Output video file")
    parser.add_argument("--story", help=f"Story key: {list(STORIES.keys())}")
    args = parser.parse_args()
    make_story_video(args.input, args.output, args.story)
