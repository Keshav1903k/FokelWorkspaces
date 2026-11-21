import csv

CSV_FILE = r'C:\Users\HP\.gemini\antigravity\brain\f1f82a4f-da5d-41a8-ba72-3fe3ba666173\.user_uploaded\media_1795162854656_5ff35893.csv'
with open(CSV_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

for i in range(len(rows)):
    r = rows[i]
    name = r.get('\ufeffProperty Name') or r.get('Property Name')
    img_link = r.get('Image Source Link')
    folder = r.get('Image Folder Name')
    print(f"[{i+1}] {name} | Folder: {folder} | Source: {img_link}")
