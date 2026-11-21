import json
import os

with open('Aggregator-main/data/properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

print(f"Total properties: {len(props)}")
for idx, p in enumerate(props):
    name = p.get('name')
    ptype = p.get('type')
    imgs = p.get('images', [])
    loc = p.get('locality') or p.get('location')
    folder = imgs[0].split('/')[3] if imgs and len(imgs[0].split('/')) > 3 else "N/A"
    print(f"[{idx+1:02d}] {name} ({ptype}) | {loc} | folder: {folder} | count: {len(imgs)}")
