import json
from collections import defaultdict

with open(r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

city_stats = defaultdict(lambda: defaultdict(int))
state_stats = defaultdict(lambda: defaultdict(int))

for p in props:
    city = p.get('city')
    state = p.get('stateCode')
    w_type = p.get('type')
    
    city_stats[city][w_type] += 1
    city_stats[city]['total'] += 1

    state_stats[state][w_type] += 1
    state_stats[state]['total'] += 1

print("--- City Stats ---")
for c, s in sorted(city_stats.items()):
    print(f"City: {c}")
    print(f"  Total: {s['total']}")
    print(f"  Coworking Space: {s.get('Coworking Space', 0)}")
    print(f"  Virtual Office: {s.get('Virtual Office', 0)}")
    print(f"  Managed Office: {s.get('Managed Office', 0)}")
    print(f"  Office/Commercial Spaces: {s.get('Office/Commercial Spaces', 0)}")

print("\n--- State Stats ---")
for st, s in sorted(state_stats.items()):
    print(f"State: {st}")
    print(f"  Total: {s['total']}")
    print(f"  Coworking Space: {s.get('Coworking Space', 0)}")
    print(f"  Virtual Office: {s.get('Virtual Office', 0)}")
    print(f"  Managed Office: {s.get('Managed Office', 0)}")
    print(f"  Office/Commercial Spaces: {s.get('Office/Commercial Spaces', 0)}")
