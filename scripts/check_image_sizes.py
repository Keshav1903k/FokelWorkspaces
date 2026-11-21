import os
import json
from PIL import Image

properties_file = r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json'
public_dir = r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public'

with open(properties_file, 'r', encoding='utf-8') as f:
    props = json.load(f)

for i, p in enumerate(props):
    short_id = p.get('shortId')
    title = p.get('title')
    internal = p.get('internalName')
    images = p.get('images', [])
    for img_idx, img_rel in enumerate(images):
        clean_rel = img_rel.lstrip('/')
        full_path = os.path.join(public_dir, clean_rel)
        if not os.path.exists(full_path):
            print(f"MISSING: [{i+1}] {short_id} {title}: {img_rel}")
            continue
        try:
            with Image.open(full_path) as im:
                w, h = im.size
                if w < 500 or h < 350:
                    print(f"SMALL IMAGE: [{i+1}] {short_id} {title} -> {img_rel} ({w}x{h})")
        except Exception as e:
            print(f"ERROR: [{i+1}] {short_id} {title}: {e}")
