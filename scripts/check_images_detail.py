import os
import json
from PIL import Image

properties_file = r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json'
public_dir = r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public'

with open(properties_file, 'r', encoding='utf-8') as f:
    props = json.load(f)

print(f"Total properties: {len(props)}")
for i, p in enumerate(props):
    short_id = p.get('shortId')
    title = p.get('title')
    internal = p.get('internalName')
    images = p.get('images', [])
    img_info = []
    for img_rel in images:
        clean_rel = img_rel.lstrip('/')
        full_path = os.path.join(public_dir, clean_rel)
        if os.path.exists(full_path):
            try:
                with Image.open(full_path) as im:
                    w, h = im.size
                    img_info.append(f"{os.path.basename(clean_rel)} ({w}x{h})")
            except Exception as e:
                img_info.append(f"{os.path.basename(clean_rel)} (ERR: {e})")
        else:
            img_info.append(f"{os.path.basename(clean_rel)} (MISSING)")
    print(f"[{i+1}] {short_id} - {title} ({internal})")
    print(f"     Folder: {images[0] if images else 'None'}")
    print(f"     Files: {', '.join(img_info)}")
