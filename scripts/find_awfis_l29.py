import requests
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}

# 1. Test Awfis L29 on myHQ
awfis_slugs = [
    "https://myhq.in/coworking-space/awfis-l-29-cp",
    "https://myhq.in/coworking-space/awfis-connaught-place-l-block",
    "https://myhq.in/coworking-space/awfis-l29-cp",
    "https://myhq.in/coworking-space/awfis-connaught-place",
    "https://myhq.in/managed-office/awfis-l-29-cp",
    "https://myhq.in/meeting-rooms/delhi/connaught-place/awfis-l29-cp",
    "https://myhq.in/meeting-rooms/delhi/connaught-place/awfis-l29-cp/meeting-room-4-seater"
]

for s in awfis_slugs:
    r = requests.get(s, headers=HEADERS, allow_redirects=True, timeout=8)
    print(f"[{r.status_code}] {s} -> {r.url}")
    if r.status_code == 200:
        imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
        print(f"   Found {len(imgs)} cloudinary imgs:")
        for im in set(imgs)[:4]:
            print("   ", im)
