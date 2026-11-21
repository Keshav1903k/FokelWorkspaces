import requests
import re
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

regus_urls = [
    "https://www.regus.com/en-gb/india/new-delhi/connaught-place-2101",
    "https://www.regus.com/en-gb/india/noida/green-boulevard-6126",
    "https://www.regus.com/en-gb/india/new-delhi/eros-corporate-tower-594"
]

for url in regus_urls:
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        print(f"\n--- {url} ({r.status_code}) ---")
        # Find all image URLs
        imgs = set(re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', r.text, re.IGNORECASE))
        # Also find in json / script data
        matches = set(re.findall(r'https?://[^\s"\'<>]*(?:ctfassets|iwgplc|azureedge|images|media)[^\s"\'<>]*', r.text))
        all_imgs = imgs.union(matches)
        for img in all_imgs:
            if not any(x in img.lower() for x in ['logo', 'icon', 'svg', 'favicon', 'font']):
                print("  Candidate:", img)
    except Exception as e:
        print(f"Err {url}: {e}")
