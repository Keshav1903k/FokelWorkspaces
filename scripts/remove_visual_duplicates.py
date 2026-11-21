import os
import json
from PIL import Image

PROPERTIES_DIR = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"
DATA_TS_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\src\constants\data.ts"
PROPERTIES_JSON_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"

def dhash(image_path, hash_size=8):
    image = Image.open(image_path).convert('L').resize((hash_size + 1, hash_size), Image.Resampling.LANCZOS)
    pixels = list(image.get_flattened_data())
    diff = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = pixels[row * (hash_size + 1) + col]
            pixel_right = pixels[row * (hash_size + 1) + col + 1]
            diff.append(pixel_left > pixel_right)
    return ''.join(['1' if v else '0' for v in diff])

def dist(s1, s2):
    return sum(c1 != c2 for c1, c2 in zip(s1, s2))

def get_image_resolution(fpath):
    try:
        with Image.open(fpath) as im:
            return im.size[0] * im.size[1]
    except Exception:
        return 0

def clean_visual_duplicates():
    folders = sorted([d for d in os.listdir(PROPERTIES_DIR) if os.path.isdir(os.path.join(PROPERTIES_DIR, d))])
    total_removed = 0

    for fld in folders:
        fld_path = os.path.join(PROPERTIES_DIR, fld)
        imgs = sorted([f for f in os.listdir(fld_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        if len(imgs) <= 1:
            continue

        # Map each file to hash and resolution
        img_info = {}
        for f in imgs:
            full = os.path.join(fld_path, f)
            try:
                h = dhash(full)
                res = get_image_resolution(full)
                img_info[f] = {"hash": h, "res": res, "path": full}
            except Exception as e:
                print(f"Error reading {full}: {e}")

        # Find duplicates (distance <= 4)
        files_to_remove = set()
        file_keys = list(img_info.keys())
        for i in range(len(file_keys)):
            for j in range(i + 1, len(file_keys)):
                f1 = file_keys[i]
                f2 = file_keys[j]
                if f1 in files_to_remove or f2 in files_to_remove:
                    continue

                d = dist(img_info[f1]["hash"], img_info[f2]["hash"])
                if d <= 4:
                    # Keep higher resolution, or f1 if equal
                    if img_info[f1]["res"] >= img_info[f2]["res"]:
                        files_to_remove.add(f2)
                        print(f"[{fld}] Removing duplicate {f2} (identical to {f1}, dHash={d})")
                    else:
                        files_to_remove.add(f1)
                        print(f"[{fld}] Removing duplicate {f1} (identical to {f2}, dHash={d})")

        # Delete marked duplicate files
        for f in files_to_remove:
            os.remove(img_info[f]["path"])
            total_removed += 1

        # Re-index remaining images sequentially
        remaining = sorted([f for f in os.listdir(fld_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        temp_renames = []
        for idx, fname in enumerate(remaining):
            old_p = os.path.join(fld_path, fname)
            tmp_p = os.path.join(fld_path, f"tmp_{idx}.jpg")
            os.rename(old_p, tmp_p)
            temp_renames.append(tmp_p)

        for idx, tmp_p in enumerate(temp_renames, 1):
            final_p = os.path.join(fld_path, f"image-{idx}.jpg")
            os.rename(tmp_p, final_p)

    print(f"\n✅ Total visual duplicate images removed: {total_removed}")

    # Sync to properties.json and data.ts
    with open(PROPERTIES_JSON_PATH, "r", encoding="utf-8") as fp:
        properties = json.load(fp)

    for prop in properties:
        slug = prop.get("slug")
        fld_path = os.path.join(PROPERTIES_DIR, slug)
        if os.path.isdir(fld_path):
            valid_imgs = [f"/images/properties/{slug}/{f}" for f in sorted(os.listdir(fld_path)) if f.endswith(".jpg")]
            if valid_imgs:
                prop["image"] = valid_imgs[0]
                prop["images"] = valid_imgs
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
        print("Successfully synced cleaned data to src/constants/data.ts!")

if __name__ == "__main__":
    clean_visual_duplicates()
