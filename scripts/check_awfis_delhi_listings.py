import requests
from bs4 import BeautifulSoup
import re
import json

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
r = requests.get("https://cofynd.com/brand/awfis/delhi", headers=HEADERS)
# Find any listing URLs or image URLs
links = re.findall(r'https?://cofynd\.com/coworking/[^\s"\'<>]+', r.text)
print("CoFynd coworking links:", set(links))

# Also search for images on that page
imgs = re.findall(r'https?://img\.cofynd\.com/images/original/[a-f0-9]+\.(?:jpg|webp|png)', r.text)
print(f"Found {len(set(imgs))} CoFynd original images:")
for im in list(set(imgs))[:10]:
    print(" ", im)
