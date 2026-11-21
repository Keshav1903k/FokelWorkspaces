import csv
import json
import os

csv_path = r'C:/Users/HP/.gemini/antigravity/brain/f1f82a4f-da5d-41a8-ba72-3fe3ba666173/.user_uploaded/media_1795176579700_5a2548ab.csv'

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    print("CSV columns:", reader.fieldnames)
    rows = list(reader)

print(f"Total rows in uploaded CSV: {len(rows)}")

with open('c:/Users/HP/OneDrive/Desktop/Aggregator2/Aggregator-main/data/properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

for i in range(len(props)):
    p = props[i]
    r = rows[i] if i < len(rows) else {}
    print(f"[{i+1}] ID:{p.get('id')} | ShortID:{p.get('shortId')} | Title:{p.get('title')}")
    print(f"     CSV Name:{r.get('name') or r.get('title')} | CSV internal_name:{r.get('internal_name')} | CSV URL:{r.get('source_url') or r.get('url') or r.get('link')}")
    print(f"     Images: {p.get('images')}")
