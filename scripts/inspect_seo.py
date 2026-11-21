import requests
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}
r = requests.get("https://api.cofynd.com/api/user/seo/regus-connaught-place-delhi", headers=HEADERS)
data = r.json().get('data', {})
print(json.dumps(data, indent=2))
