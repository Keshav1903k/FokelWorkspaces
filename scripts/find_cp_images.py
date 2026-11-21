import requests
import re
from PIL import Image
import io

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# 1. Search myHQ CP
r = requests.get('https://myhq.in/coworking-spaces/delhi/connaught-place', headers=HEADERS, timeout=10)
print('myhq CP status:', r.status_code)
imgs = re.findall(r'https://res\.cloudinary\.com/myhq/image/upload/[^\s"\'<>]+\.jpg', r.text)
print('myhq CP total imgs:', len(imgs))
for u in set(imgs):
    if 'workspaces' in u:
        print('  myHQ workspace img:', u)

# 2. Search CoFynd Awfis CP specifically
r2 = requests.get('https://cofynd.com/coworking/delhi/awfis-connaught-place', headers=HEADERS, timeout=10)
print('\ncofynd awfis CP status:', r2.status_code)
imgs2 = re.findall(r'https?://img\.cofynd\.com/images/original/[a-f0-9]+\.(?:jpg|webp|png)', r2.text)
print('cofynd imgs:', len(imgs2))
for u in list(set(imgs2)):
    try:
        resp = requests.get(u, headers=HEADERS, timeout=5)
        if resp.status_code == 200:
            im = Image.open(io.BytesIO(resp.content))
            print('  cofynd img:', u, 'size=', im.size)
    except Exception as e:
        print('  err:', e)
