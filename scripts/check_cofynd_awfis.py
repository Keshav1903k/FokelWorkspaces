import requests

url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZUaEgm1weTv_DXfEY9i-6XCakcw9dy2ICrwLD7eHmRNivZPBg5fIsSMqwBfK23ZFQiNf6tByOeO0-IGa5im9HHZI2l84FMmdrJf6Sy4oKrqSYv5Q346hGKg=="
HEADERS = {"User-Agent": "Mozilla/5.0"}
r = requests.get(url, headers=HEADERS, allow_redirects=True)
print("Resolved:", r.url)
