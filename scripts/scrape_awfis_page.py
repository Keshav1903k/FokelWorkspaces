import requests
from bs4 import BeautifulSoup
import re
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}
url = "https://www.awfis.com/office-space/new-delhi/connaught-place/coworking-connaught-place/office"
r = requests.get(url, headers=HEADERS, timeout=10)
soup = BeautifulSoup(r.text, "html.parser")
imgs = soup.find_all("img")
print("Total img tags:", len(imgs))
for img in imgs:
    src = img.get("src") or img.get("data-src")
    alt = img.get("alt")
    print(f"alt: {alt} | src: {src}")

# Search for awfis image cdn
cdn_imgs = set(re.findall(r'https?://[^\s"\'<>]*(?:awfis|cloudfront|aws)[^\s"\'<>]*(?:\.jpg|\.png|\.webp|\.jpeg)', r.text, re.IGNORECASE))
print("CDN images:", cdn_imgs)
