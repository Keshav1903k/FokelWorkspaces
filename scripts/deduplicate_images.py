import os
import hashlib
from PIL import Image
import json

PROPERTIES_DIR = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"
DATA_TS_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\src\constants\data.ts"
PROPERTIES_JSON_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"

# Distinct high-res architectural images to give properties that had only generic duplicate badges
DISTINCT_REPLACEMENTS = {
    "regus-eros-corporate-tower": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1400",
    ],
    "regus-noida-virtual-office-green-boulevard": [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1400",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1400",
    ],
    "i-thum-tower-sector-62": [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400",
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1400",
    ],
    "cowrks-paras-twin-towers-virtual-office": [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1400",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1400",
    ],
    "regus-unitech-cyber-park-virtual-office": [
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1400",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400",
    ],
}

def get_hash(fpath):
    with open(fpath, "rb") as fp:
        return hashlib.md5(fp.read()).hexdigest()

def is_valid_image(fpath):
    try:
        with Image.open(fpath) as im:
            im.verify()
        return True
    except Exception:
        return False

def remove_duplicates_and_cleanup():
    # 1. First remove corrupt / non-image files (HTML error pages)
    removed_corrupt = 0
    for root, dirs, files in os.walk(PROPERTIES_DIR):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                fpath = os.path.join(root, f)
                if not is_valid_image(fpath):
                    print(f"Removing invalid/corrupt non-image: {fpath}")
                    os.remove(fpath)
                    removed_corrupt += 1

    # 2. Check all files and remove exact duplicates (both intra-folder and cross-folder)
    seen_hashes = {}
    removed_duplicates = []

    for root, dirs, files in os.walk(PROPERTIES_DIR):
        fld = os.path.basename(root)
        for f in sorted(files):
            if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue
            fpath = os.path.join(root, f)
            h = get_hash(fpath)

            if h in seen_hashes:
                original_fpath = seen_hashes[h]
                print(f"Duplicate found:\n   Target:   {fld}/{f}\n   Original: {original_fpath}\n   Action: Removing duplicate {fld}/{f}")
                os.remove(fpath)
                removed_duplicates.append((fld, f, original_fpath))
            else:
                seen_hashes[h] = f"{fld}/{f}"

    print(f"\nTotal duplicate images removed: {len(removed_duplicates)}")

    # 3. Handle properties that need replacement images or re-indexing
    import requests
    headers = {"User-Agent": "Mozilla/5.0"}
    for fld, urls in DISTINCT_REPLACEMENTS.items():
        folder_path = os.path.join(PROPERTIES_DIR, fld)
        os.makedirs(folder_path, exist_ok=True)
        cur_files = [f for f in os.listdir(folder_path) if f.endswith('.jpg')]
        if len(cur_files) < 2:
            for idx, u in enumerate(urls, len(cur_files) + 1):
                try:
                    r = requests.get(u, headers=headers, timeout=10)
                    if r.status_code == 200:
                        save_name = f"image-{idx}.jpg"
                        with open(os.path.join(folder_path, save_name), "wb") as fp:
                            fp.write(r.content)
                        print(f"Added unique replacement photo: {fld}/{save_name}")
                except Exception as e:
                    print(f"Failed replacement download for {fld}: {e}")

    # 4. Re-index remaining images in each folder sequentially: image-1.jpg, image-2.jpg...
    folders = [d for d in os.listdir(PROPERTIES_DIR) if os.path.isdir(os.path.join(PROPERTIES_DIR, d))]
    for fld in folders:
        folder_path = os.path.join(PROPERTIES_DIR, fld)
        imgs = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        
        # Temp rename to avoid collision
        temp_names = []
        for i, fname in enumerate(imgs):
            old_p = os.path.join(folder_path, fname)
            temp_p = os.path.join(folder_path, f"temp_{i}.jpg")
            os.rename(old_p, temp_p)
            temp_names.append(temp_p)

        # Final rename
        for i, temp_p in enumerate(temp_names, 1):
            final_p = os.path.join(folder_path, f"image-{i}.jpg")
            os.rename(temp_p, final_p)

    # 5. Sync updated image lists to properties.json and data.ts
    with open(PROPERTIES_JSON_PATH, "r", encoding="utf-8") as fp:
        properties = json.load(fp)

    for prop in properties:
        slug = prop.get("slug")
        fld_path = os.path.join(PROPERTIES_DIR, slug)
        if os.path.isdir(fld_path):
            imgs = [f"/images/properties/{slug}/{f}" for f in sorted(os.listdir(fld_path)) if f.endswith(".jpg")]
            if imgs:
                prop["image"] = imgs[0]
                prop["images"] = imgs
            else:
                prop["images"] = [prop["image"]]

    with open(PROPERTIES_JSON_PATH, "w", encoding="utf-8") as fp:
        json.dump(properties, fp, indent=2)

    with open(DATA_TS_PATH, "r", encoding="utf-8") as fp:
        ts_content = fp.read()

    start_marker = "export const WORKSPACES: WorkspaceSpace[] = ["
    end_marker = "export const TIMELINE_STEPS = ["
    s_idx = ts_content.find(start_marker)
    e_idx = ts_content.find(end_marker)
    if s_idx != -1 and e_idx != -1:
        new_ts = ts_content[:s_idx] + "export const WORKSPACES: WorkspaceSpace[] = " + json.dumps(properties, indent=2) + ";\n\n" + ts_content[e_idx:]
        with open(DATA_TS_PATH, "w", encoding="utf-8") as fp:
            fp.write(new_ts)
        print("Successfully synced cleaned properties to src/constants/data.ts!")

    print("\n✅ Duplicate image removal and re-indexing complete!")

if __name__ == "__main__":
    remove_duplicates_and_cleanup()
