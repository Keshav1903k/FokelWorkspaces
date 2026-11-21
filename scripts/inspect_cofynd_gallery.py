import json
import re
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}

url = "https://cofynd.com/coworking/delhi/regus-connaught-place"
resp = requests.get(url, headers=HEADERS, timeout=15)
soup = BeautifulSoup(resp.text, "html.parser")

# Let's inspect scripts containing image or gallery data
for s in soup.find_all("script"):
    txt = s.string or ""
    if "images" in txt and ("connaught" in txt.lower() or "regus" in txt.lower() or "cofynd-media" in txt or "original" in txt):
        print(f"Script match len={len(txt)}: {txt[:300]}...")

# Also let's find all images inside main content or gallery divs
for img in soup.find_all("img"):
    src = img.get("src") or img.get("data-src") or ""
    alt = img.get("alt") or ""
    if src:
        print(f"IMG: alt='{alt}' src='{src}'")
