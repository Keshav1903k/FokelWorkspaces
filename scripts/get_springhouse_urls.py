import requests
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

r = requests.get("https://myhq.in/managed-office/springhouse-welldone-tech-park", headers=HEADERS)
print("Managed office status:", r.status_code)
imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
sh_imgs = [img for img in set(imgs) if "springhouse" in img or "welldone" in img]
print(f"Found {len(sh_imgs)} springhouse imgs:")
for im in sh_imgs[:10]:
    print(im)
