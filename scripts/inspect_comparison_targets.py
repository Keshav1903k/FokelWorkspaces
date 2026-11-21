import json

with open('Aggregator-main/data/properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

targets = ['DLF Cyber City', 'Aerocity', 'Koramangala', 'Sector 48 Managed', 'Indiranagar']
for p in props:
    name = p.get('name', '')
    loc = p.get('location', '') or p.get('locality', '')
    if any(t.lower() in name.lower() or t.lower() in loc.lower() for t in targets):
        print(f"ID: {p.get('id')} | Name: {name} | Type: {p.get('type')} | Price: {p.get('price')} | Loc: {loc}")
        print(f"   Internal: {p.get('internalName', '')}")
        print(f"   Address: {p.get('address', '')}")
        print(f"   Amenities: {p.get('amenities', [])}")
        print('---')
