import requests
from PIL import Image
import io
import re

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

def check_myhq(slug):
    url = f"https://myhq.in/coworking-space/{slug}"
    r = requests.get(url, headers=HEADERS)
    print(f"\n--- {slug} ({r.status_code}) ---")
    imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
    # filter
    work_imgs = [img for img in set(imgs) if slug in img or "workspaces" in img]
    print(f"Found {len(work_imgs)} images for {slug}:")
    for im in work_imgs[:5]:
        print(" ", im)
    return work_imgs

# Check Sector 62
check_myhq("91springboard-bhutani-62-avenue")
check_myhq("wework-embassy-galaxy-business-park")

# Check Nehru Place
check_myhq("workly-nehruplace")
check_myhq("91springboard-chandra-bhavan")
