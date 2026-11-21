import os
import requests
from PIL import Image
import io

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

BASE_DIR = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"

downloads = {
    # 1. Connaught Place Virtual Office (Awfis Connaught Place L-Block)
    "connaught-place-virtual-office-l29-l34-block-l": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/3.jpg",
    ],
    # 2. Nehru Place Virtual Office (Workly Nehru Place / 91springboard)
    "nehru-place-virtual-office-registerkaro": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/3.jpg",
    ],
    # 3. Aerocity Virtual Office (CoWrks Worldmark 1 Aerocity)
    "aerocity-virtual-office-thegstco": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/3.jpg",
    ],
    # 4. Golf Course Road Virtual Office (CoWrks Paras Twin Towers)
    "cowrks-paras-twin-towers-virtual-office": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-paras-twin-towers/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-paras-twin-towers/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-paras-twin-towers/3.jpg",
    ],
    # 5. Sector 39 Virtual Office (Regus Unitech Cyber Park)
    "regus-unitech-cyber-park-virtual-office": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/regus-unitech-cyber-park/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/regus-unitech-cyber-park/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/regus-unitech-cyber-park/3.jpg",
    ],
    # 6. Sector 62 Virtual Office (Awfis Green Boulevard Noida)
    "regus-noida-virtual-office-green-boulevard": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/3.jpg",
    ]
}

def run():
    for folder, urls in downloads.items():
        target_dir = os.path.join(BASE_DIR, folder)
        os.makedirs(target_dir, exist_ok=True)
        print(f"\nProcessing {folder}:")
        for i, url in enumerate(urls):
            filename = f"image-{i+1}.jpg"
            dest = os.path.join(target_dir, filename)
            try:
                r = requests.get(url, headers=HEADERS, timeout=15)
                if r.status_code == 200:
                    img = Image.open(io.BytesIO(r.content))
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    img.save(dest, 'JPEG', quality=92)
                    print(f"  [SAVED] {filename} ({img.size[0]}x{img.size[1]}) from {url}")
                else:
                    print(f"  [FAIL] HTTP {r.status_code} for {url}")
            except Exception as e:
                print(f"  [ERROR] {url}: {e}")

if __name__ == '__main__':
    run()
