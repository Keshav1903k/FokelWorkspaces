import requests
from bs4 import BeautifulSoup
import re
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

urls_to_test = [
    # Connaught Place
    "https://myhq.in/coworking-space/regus-connaught-place",
    "https://myhq.in/coworking-space/innov8-connaught-place-regal-building",
    "https://myhq.in/coworking-space/ABL-Workspaces-CP",
    "https://www.regus.com/en-gb/india/new-delhi/connaught-place-2101",
    # Nehru Place
    "https://myhq.in/coworking-space/91springboard-chandra-bhavan",
    "https://myhq.in/coworking-space/workly-nehruplace",
    "https://www.regus.com/en-gb/india/new-delhi/eros-corporate-tower-594",
    # Aerocity
    "https://myhq.in/coworking-space/cowrks-worldmark-1",
    # Paras Twin Towers Golf Course Road
    "https://myhq.in/coworking-space/cowrks-paras-twin-towers",
    # Sector 39 Gurugram (Unitech Cyber Park)
    "https://myhq.in/coworking-space/unitech-cyber-park",
    "https://myhq.in/coworking-space/regus-unitech-cyber-park",
    "https://www.regus.com/en-gb/india/gurugram/unitech-cyber-park-6282",
    # Sector 62 Noida (Green Boulevard)
    "https://www.regus.com/en-gb/india/noida/green-boulevard-6126",
    "https://myhq.in/coworking-space/regus-green-boulevard",
    "https://myhq.in/coworking-space/ithum-sector-62",
]

for u in urls_to_test:
    try:
        r = requests.get(u, headers=HEADERS, timeout=8)
        print(f"[{r.status_code}] {u}")
        if r.status_code == 200:
            # find cloudinary or cdn images
            imgs = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', r.text)
            filtered = [img for img in set(imgs) if any(k in img for k in ["cloudinary", "workspaces", "centres", "regus", "myhq"]) and not any(k in img for k in ["svg", "icon", "logo", "menu"])]
            print(f"   -> Found {len(filtered)} workspace images")
            for f in filtered[:3]:
                print(f"      {f}")
    except Exception as e:
        print(f"[ERR] {u}: {e}")
