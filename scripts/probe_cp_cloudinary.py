import requests

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

test_slugs = [
    'connect-hq-abl-workspaces-cp',
    'work-matrix-naurang-house',
    'awfis-connaught-place',
    'awfis-l29-cp',
    'awfis-l-block-cp',
    'innov8-cp',
    'innov8-regal-building-cp',
    'innov8-connaught-place',
    'abl-workspaces-cp',
    'abl-connaught-place',
    'start-coworks-connaught-place',
    'start-coworks-cp',
    'myhq-connaught-place',
    'cowrks-connaught-place',
    'regus-connaught-place',
    'regus-barakhamba-road',
    'wework-connaught-place'
]

for slug in test_slugs:
    for idx in [1, 2, 3]:
        url = f"https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/{slug}/{idx}.jpg"
        try:
            r = requests.head(url, headers=HEADERS, timeout=4)
            if r.status_code == 200:
                print(f"[FOUND] {slug}/{idx}.jpg -> {url}")
        except Exception:
            pass
