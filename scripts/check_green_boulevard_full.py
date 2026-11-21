import requests
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}
slugs = [
    "https://myhq.in/office-space-for-rent/green-boulevard-tower-a",
    "https://myhq.in/office-space-for-rent/green-boulevard-tower-c",
    "https://myhq.in/coworking-space/awfis-green-boulevard",
    "https://myhq.in/coworking-space/incuspaze-green-boulevard"
]

for s in slugs:
    r = requests.get(s, headers=HEADERS)
    print(f"[{r.status_code}] {s}")
    if r.status_code == 200:
        imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
        print(f"   Found {len(imgs)} imgs")
        for im in list(set(imgs))[:3]:
            print("   ", im)
