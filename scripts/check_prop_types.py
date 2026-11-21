import json

with open(r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

for i in range(37, 46):
    p = props[i]
    print(f"[{p.get('shortId')}] Title: {p.get('title')} | Type: {repr(p.get('type'))}")
