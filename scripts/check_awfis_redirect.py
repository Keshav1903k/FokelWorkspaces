import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}

redirect_url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFapDjwQdSXtgoQbDYk16BLM76svLhDo6z3RfSLC5BbTZzdxCb9hlkBf6Ts0KTo8nZCOyU1oep10u8tPHM2y2s5DLnzznWmbsELhpiXiIj5JKl7pe0bDvIGcaHnNUY6PN_TOMNTPOiRC6Of8WHSmYy7gay1XF9vMC2gOt1x2NagLgkYrE3Q1cO9Me-WwURF5zUGUnE="

try:
    r = requests.get(redirect_url, headers=HEADERS, timeout=10, allow_redirects=True)
    print("Resolved URL:", r.url)
    print("Status:", r.status_code)
    # find images on this awfis page
    import re
    imgs = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', r.text)
    print(f"Found {len(imgs)} images:")
    for im in set(imgs):
        if not any(x in im.lower() for x in ['logo', 'icon', 'svg']):
            print("  ", im)
except Exception as e:
    print("Error:", e)
