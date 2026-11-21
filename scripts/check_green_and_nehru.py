import requests
import re
from PIL import Image
import io

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

def check_cofynd_page(url, name):
    print(f"\n--- Checking {name}: {url} ---")
    r = requests.get(url, headers=HEADERS)
    print("Status:", r.status_code)
    imgs = re.findall(r'https?://img\.cofynd\.com/images/original/[a-f0-9]+\.(?:jpg|webp|png)', r.text)
    print(f"Found {len(set(imgs))} images:")
    valid = []
    for u in set(imgs):
        try:
            resp = requests.get(u, headers=HEADERS, timeout=5)
            if resp.status_code == 200:
                im = Image.open(io.BytesIO(resp.content))
                if im.size[0] >= 600 and im.size[1] >= 400:
                    valid.append((u, im.size))
                    print(f"  Valid: {u} -> {im.size}")
        except Exception as e:
            pass
    return valid

# 1. Regus Green Boulevard
check_cofynd_page("https://cofynd.com/coworking/noida/regus-green-boulevard", "Regus Green Boulevard Noida")

# 2. Nehru Place CoFynd spaces
check_cofynd_page("https://cofynd.com/coworking/delhi/regus-eros-corporate-tower-nehru-place", "Regus Eros Nehru Place")
check_cofynd_page("https://cofynd.com/coworking/delhi/awfis-nehru-place", "Awfis Nehru Place")
