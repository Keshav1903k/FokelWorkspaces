import requests
import re
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

r = requests.get("https://myhq.in/coworking-space/awfis-green-boulevard", headers=HEADERS)
imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
awfis_imgs = [img for img in set(imgs) if "awfis-green-boulevard" in img]
print(f"Found {len(awfis_imgs)} awfis green boulevard imgs:")
for im in awfis_imgs:
    print(im)
