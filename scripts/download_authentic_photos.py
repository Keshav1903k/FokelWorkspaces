import os
import requests
from PIL import Image
import io

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

PUBLIC_PROPERTIES = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"

# Target download mapping
downloads = {
    # 1. Connaught Place Virtual Office (Awfis L-Block CP)
    "connaught-place-virtual-office-l29-l34-block-l": [
        "https://img.cofynd.com/images/original/a9e4e4e0027b7403a097d85842847623fede1589.jpg",
        "https://img.cofynd.com/images/original/284b68fedb180cbd3fdde58409a209cc9d86e623.jpg",
        "https://img.cofynd.com/images/original/1c65a15d5cd652769832d038adda6663253940c9.jpg",
    ],
    # 2. Nehru Place Virtual Office
    "nehru-place-virtual-office-registerkaro": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/3.jpg",
    ],
    # 3. Aerocity Virtual Office (Worldmark Aerocity)
    "aerocity-virtual-office-thegstco": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/3.jpg",
    ],
    # 4. Golf Course Road Virtual Office (Paras Twin Towers)
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
    # 6. Sector 62 Virtual Office (Green Boulevard Noida)
    "regus-noida-virtual-office-green-boulevard": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-green-boulevard/3.jpg",
    ],
    # 7. Sector 48 Managed Office (Springhouse Welldone Tech Park)
    "springhouse-welldone-tech-park": [
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/springhouse-welldone-tech-park/1.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/springhouse-welldone-tech-park/2.jpg",
        "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/springhouse-welldone-tech-park/3.jpg",
    ]
}

def download_and_save():
    for folder, urls in downloads.items():
        folder_path = os.path.join(PUBLIC_PROPERTIES, folder)
        os.makedirs(folder_path, exist_ok=True)
        print(f"\nProcessing folder: {folder}")
        
        for idx, url in enumerate(urls):
            filename = f"image-{idx+1}.jpg"
            dest = os.path.join(folder_path, filename)
            try:
                r = requests.get(url, headers=HEADERS, timeout=15)
                if r.status_code == 200:
                    img = Image.open(io.BytesIO(r.content))
                    # convert to RGB if needed
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    img.save(dest, "JPEG", quality=92)
                    print(f"  [OK] Saved {filename} ({img.size[0]}x{img.size[1]}) from {url[:60]}...")
                else:
                    print(f"  [FAIL] HTTP {r.status_code} for {url}")
            except Exception as e:
                print(f"  [ERR] {url}: {e}")

if __name__ == "__main__":
    download_and_save()
