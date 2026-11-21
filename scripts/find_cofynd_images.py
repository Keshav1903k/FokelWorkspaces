import requests
from bs4 import BeautifulSoup
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}

url = "https://cofynd.com/coworking/delhi/regus-connaught-place"
resp = requests.get(url, headers=HEADERS, timeout=15)

# Find all occurrences of api.cofynd.com
apis = set(re.findall(r'https?://api\.cofynd\.com[^\s"\'<>)]+', resp.text))
print("APIs found:", apis)

# Search for image URLs in the whole text that match cofynd or aws
aws_images = set(re.findall(r'https?://[^\s"\'<>]*(?:cofynd|amazonaws)[^\s"\'<>]*(?:\.webp|\.jpg|\.png|\.jpeg)', resp.text, re.IGNORECASE))
print(f"Total aws/cofynd images found: {len(aws_images)}")
for img in sorted(aws_images):
    if not any(x in img for x in ['logo', 'icon', 'latest_images_2024']):
        print("  Candidate:", img)
