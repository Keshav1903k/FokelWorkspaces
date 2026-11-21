import csv

CSV_FILE = r'C:\Users\HP\.gemini\antigravity\brain\f1f82a4f-da5d-41a8-ba72-3fe3ba666173\.user_uploaded\media_1795162854656_5ff35893.csv'
with open(CSV_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    print("Field names:", reader.fieldnames)
    rows = list(reader)

for i in range(len(rows)):
    r = rows[i]
    name = r.get("name") or r.get("title") or r.get("Property Name")
    url = r.get("url") or r.get("source_url") or r.get("link") or r.get("Source URL")
    print(f"Row {i+1}: {name} -> {url}")
