import requests
import re
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

r = requests.get('https://myhq.in/coworking-space/delhi', headers=HEADERS, timeout=10)
print('myhq delhi status:', r.status_code)
links = re.findall(r'href=[\'"](/coworking-space/[^\'"]+)[\'"]', r.text)
cp_links = [l for l in set(links) if 'cp' in l or 'connaught' in l or 'abl' in l or 'innov8' in l or 'barakhamba' in l or 'regus' in l or 'awfis' in l]
print('Found relevant links in Delhi:', len(cp_links))
for l in cp_links[:15]:
    print(' ', l)
