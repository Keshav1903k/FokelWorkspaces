import requests
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json",
}

endpoints = [
    "https://api.cofynd.com/api/user/seo/regus-connaught-place-delhi",
    "https://api.cofynd.com/api/user/space/regus-connaught-place",
    "https://api.cofynd.com/api/user/spaceDetails/regus-connaught-place",
    "https://api.cofynd.com/api/space/regus-connaught-place",
]

for ep in endpoints:
    try:
        r = requests.get(ep, headers=HEADERS, timeout=10)
        print(f"{ep} -> Status: {r.status_code}")
        if r.status_code == 200:
            data = r.json()
            print("Keys:", list(data.keys()) if isinstance(data, dict) else len(data))
            # search for images in data
            s = json.dumps(data)
            import re
            imgs = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', s)
            print(f"Found {len(imgs)} images in response:")
            for img in set(imgs):
                print("  ", img)
    except Exception as e:
        print(f"Err {ep}: {e}")
