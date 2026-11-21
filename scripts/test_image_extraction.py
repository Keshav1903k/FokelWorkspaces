import os
import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

def get_page_images(url):
    print(f"\n--- Fetching: {url} ---")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            print(f"Status: {resp.status_code}")
            return []
    except Exception as e:
        print(f"Fetch error: {e}")
        return []

    html = resp.text
    soup = BeautifulSoup(html, "html.parser")
    found_urls = []

    # 1. Check for Next.js __NEXT_DATA__
    next_script = soup.find("script", id="__NEXT_DATA__")
    if next_script and next_script.string:
        try:
            data = json.loads(next_script.string)
            def search_dict(obj):
                if isinstance(obj, dict):
                    for k, v in obj.items():
                        if isinstance(v, str) and ("http" in v or v.startswith("/")):
                            if any(ext in v.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]) or "amazonaws" in v or "myhq" in v or "cofynd" in v:
                                found_urls.append(v)
                        search_dict(v)
                elif isinstance(obj, list):
                    for item in obj:
                        search_dict(item)
            search_dict(data)
        except Exception as e:
            print("Next data parse err:", e)

    # 2. Check all img tags
    for img in soup.find_all("img"):
        for attr in ["src", "data-src", "data-original", "data-lazy-src"]:
            v = img.get(attr)
            if v and v.startswith("http"):
                found_urls.append(v)

    # 3. Check regex for amazonaws or myhq cdn image links
    matches = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', html, re.IGNORECASE)
    found_urls.extend(matches)

    # Filter out junk
    clean = []
    seen = set()
    reject = ["logo", "icon", "banner", "avatar", "badge", "rating", "star", "social", "facebook", "twitter", "linkedin", "favicon", "pin", "arrow", "quote"]
    for u in found_urls:
        u_lower = u.lower()
        if any(r in u_lower for r in reject):
            continue
        if u not in seen:
            seen.add(u)
            clean.append(u)

    print(f"Found {len(clean)} image candidates.")
    for idx, u in enumerate(clean[:10]):
        print(f"  {idx+1}: {u}")
    return clean

if __name__ == "__main__":
    targets = {
        "regus_cp": "https://cofynd.com/coworking/delhi/regus-connaught-place",
        "cowrks_paras": "https://myhq.in/coworking-space/cowrks-paras-twin-towers",
        "regus_green_boulevard": "https://cofynd.com/coworking/noida/regus-green-boulevard",
        "cowrks_worldmark": "https://myhq.in/coworking-space/cowrks-worldmark-1",
        "regus_eros_nehru_place": "https://cofynd.com/coworking/delhi/regus-eros-corporate-tower-nehru-place",
        "ithum_62": "https://cofynd.com/coworking/noida/ithum-sector-62",
    }
    for name, url in targets.items():
        get_page_images(url)
