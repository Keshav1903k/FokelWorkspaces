import requests

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

test_urls = [
    # Awfis CP
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/1.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/2.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/awfis-connaughtplace/3.jpg",
    # Innov8 CP
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/innov8-cp/1.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/innov8-cp/2.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/innov8-cp/3.jpg",
    # Nehru Place (Workly / 91springboard / Regus)
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/1.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/2.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/workly-nehruplace/3.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/91springboard-chandra-bhavan/1.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/91springboard-chandra-bhavan/2.jpg",
    # Aerocity (CoWrks Worldmark / Innov8 Pride Plaza / Roseate House)
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/1.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/2.jpg",
    "https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/cowrks-worldmark-1/3.jpg",
]

for u in test_urls:
    try:
        r = requests.head(u, headers=HEADERS, timeout=5)
        print(f"[{r.status_code}] {u.split('workspaces/')[1] if 'workspaces/' in u else u}")
    except Exception as e:
        print(f"[ERR] {u}: {e}")
