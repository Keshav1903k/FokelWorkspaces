import json

with open(r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

for p in props:
    print(f"[{p.get('shortId')}] City: {p.get('city')} | State: {p.get('stateCode')} | Loc: {p.get('location')} | Type: {p.get('workspaceType')}")
