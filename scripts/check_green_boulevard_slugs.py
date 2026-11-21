import requests
import re

HEADERS = {"User-Agent": "Mozilla/5.0"}
slugs = [
    "https://myhq.in/coworking-space/awfis-green-boulevard",
    "https://myhq.in/managed-office/awfis-green-boulevard",
    "https://myhq.in/coworking-space/awfis-green-boulevard-sector-62",
    "https://myhq.in/coworking-space/incuspaze-green-boulevard",
    "https://myhq.in/office-space-for-rent/green-boulevard-tower-a",
    "https://myhq.in/office-space-for-rent/green-boulevard-tower-c",
]

for s in slugs:
    r = requests.get(s, headers=HEADERS)
    print(f"[{r.status_code}] {s}")
    if r.status_code == 200:
        imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
        print(f"   Found {len(imgs)} imgs")
        for im in list(set(imgs))[:3]:
            print("   ", im)
