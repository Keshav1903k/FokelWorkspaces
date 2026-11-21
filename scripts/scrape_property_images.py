import os
import re
import sys
import time
import json
import csv
import urllib.parse
import shutil
import requests
from bs4 import BeautifulSoup

CSV_FILE = r"C:\Users\HP\.gemini\antigravity\brain\f1f82a4f-da5d-41a8-ba72-3fe3ba666173\.user_uploaded\media_1795162854656_5ff35893.csv"
OUTPUT_DIR = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"
PROPERTIES_JSON = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[\s_-]+", "-", text).strip("-")

def is_valid_workspace_image(url):
    if not url or not url.startswith("http"):
        return False
    url_lower = url.lower()
    reject_patterns = [
        "logo", "icon", "avatar", "badge", "rating", "star", "social", 
        "facebook", "twitter", "linkedin", "favicon", ".svg", ".gif", 
        "data:image", "placeholder", "user_profile", "map", "pin"
    ]
    if any(p in url_lower for p in reject_patterns):
        return False
    valid_exts = [".jpg", ".jpeg", ".png", ".webp"]
    has_ext = any(ext in url_lower for ext in valid_exts)
    has_photo_keyword = any(k in url_lower for k in [
        "images", "photo", "gallery", "uploads", "workspace", "coworking", 
        "cdn", "myhq", "cofynd", "regus", "spaces", "wework", "smartworks", "awfis"
    ])
    return has_ext or has_photo_keyword

def extract_images_from_json(data, collected):
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, str) and is_valid_workspace_image(v):
                if v not in collected:
                    collected.append(v)
            elif isinstance(v, (dict, list)):
                extract_images_from_json(v, collected)
    elif isinstance(data, list):
        for item in data:
            extract_images_from_json(item, collected)

def extract_image_urls(page_url):
    found_urls = []
    try:
        resp = requests.get(page_url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return []
        
        html = resp.text
        soup = BeautifulSoup(html, "html.parser")

        # 1. Check for Next.js / Nuxt embedded state
        next_data_tag = soup.find("script", id="__NEXT_DATA__")
        if next_data_tag and next_data_tag.string:
            try:
                next_json = json.loads(next_data_tag.string)
                extract_images_from_json(next_json, found_urls)
            except Exception:
                pass

        # 2. Check OpenGraph image
        og_img = soup.find("meta", property="og:image")
        if og_img and og_img.get("content"):
            u = og_img["content"]
            if is_valid_workspace_image(u) and u not in found_urls:
                found_urls.append(u)

        # 3. Check all <img> tags
        for img in soup.find_all("img"):
            for attr in ["src", "data-src", "data-original", "data-lazy-src", "data-zoom-src"]:
                src = img.get(attr)
                if not src:
                    continue
                full_url = urllib.parse.urljoin(page_url, src)
                if is_valid_workspace_image(full_url) and full_url not in found_urls:
                    found_urls.append(full_url)

        # 4. Check JSON-LD
        for script in soup.find_all("script", type="application/ld+json"):
            if script.string:
                try:
                    ld = json.loads(script.string)
                    extract_images_from_json(ld, found_urls)
                except Exception:
                    pass

        # 5. Regex search for direct CDN URLs in JavaScript/CSS
        matches = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', html, re.IGNORECASE)
        for m in matches:
            if is_valid_workspace_image(m) and m not in found_urls:
                found_urls.append(m)

    except Exception as e:
        print(f"    [!] Error scraping {page_url}: {e}", flush=True)

    return found_urls

def download_image(img_url, save_path):
    try:
        r = requests.get(img_url, headers=HEADERS, timeout=15, stream=True)
        if r.status_code == 200:
            content_length = r.headers.get("content-length")
            if content_length and int(content_length) < 15000:
                return False
            
            content = bytearray()
            for chunk in r.iter_content(1024 * 8):
                content.extend(chunk)

            if len(content) < 15000:  # < 15KB filter
                return False

            with open(save_path, "wb") as f:
                f.write(content)
            return True
    except Exception:
        pass
    return False

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    manifest = {}

    with open(CSV_FILE, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Total properties to process: {len(rows)}", flush=True)

    for idx, row in enumerate(rows, 1):
        name = row.get("Property Name", "").strip() or f"Property {idx}"
        folder_slug = slugify(name)
        target_folder = os.path.join(OUTPUT_DIR, folder_slug)
        os.makedirs(target_folder, exist_ok=True)

        primary_link = row.get("Image Source Link", "").strip()
        data_notes = row.get("Data Notes", "")

        urls_to_try = []
        if primary_link.startswith("http"):
            urls_to_try.append(primary_link)

        # Check for photo links in Data Notes
        notes_urls = re.findall(r'https?://[^\s)]+', data_notes)
        for nu in notes_urls:
            if nu not in urls_to_try:
                urls_to_try.append(nu)

        print(f"[{idx}/{len(rows)}] {name} -> {folder_slug}", flush=True)
        candidate_images = []
        for u in urls_to_try:
            imgs = extract_image_urls(u)
            for im in imgs:
                if im not in candidate_images:
                    candidate_images.append(im)
            if len(candidate_images) >= 6:
                break

        print(f"    Found {len(candidate_images)} potential image URLs", flush=True)

        saved_files = []
        count = 1
        for img_url in candidate_images:
            filename = f"image-{count}.jpg"
            save_path = os.path.join(target_folder, filename)
            if download_image(img_url, save_path):
                rel_path = f"/images/properties/{folder_slug}/{filename}"
                saved_files.append(rel_path)
                count += 1
            if count > 3:  # 3 images per property
                break

        manifest[folder_slug] = saved_files
        print(f"    Saved {len(saved_files)} images to '{folder_slug}/'", flush=True)
        time.sleep(0.4)

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as mf:
        json.dump(manifest, mf, indent=2)

    print(f"\n✅ Finished scraping! Manifest saved to {manifest_path}", flush=True)

if __name__ == "__main__":
    main()
