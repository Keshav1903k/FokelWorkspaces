import requests
import re
from PIL import Image
import io

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
url = "https://cofynd.com/coworking/awfis-connaught-place"
r = requests.get(url, headers=HEADERS)
print("Status:", r.status_code)

imgs = re.findall(r'https?://img\.cofynd\.com/images/original/[a-f0-9]+\.(?:jpg|webp|png)', r.text)
print(f"Awfis CP image links ({len(imgs)}):")
for u in set(imgs):
    # Check resolution of image
    try:
        resp = requests.get(u, headers=HEADERS, timeout=5)
        if resp.status_code == 200:
            im = Image.open(io.BytesIO(resp.content))
            print(f"  {u} -> size={im.size}")
    except Exception as e:
        print(f"  {u} -> err={e}")
