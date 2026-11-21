import json
from collections import defaultdict

with open(r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

print(f"Total properties: {len(props)}")

by_city = defaultdict(lambda: defaultdict(int))
by_state = defaultdict(lambda: defaultdict(int))

for p in props:
    city = p.get('city', 'Unknown')
    state = p.get('stateCode') or p.get('state') or 'Unknown'
    w_type = p.get('workspaceType') or p.get('type') or 'Unknown'
    by_city[city][w_type] += 1
    by_city[city]['TOTAL'] += 1
    by_state[state][w_type] += 1
    by_state[state]['TOTAL'] += 1

print("\n--- By City ---")
for city, counts in sorted(by_city.items()):
    types_str = ", ".join(f"{k}: {v}" for k, v in counts.items() if k != 'TOTAL')
    print(f"City: {city:<15} | Total: {counts['TOTAL']} ({types_str})")

print("\n--- By State ---")
for state, counts in sorted(by_state.items()):
    types_str = ", ".join(f"{k}: {v}" for k, v in counts.items() if k != 'TOTAL')
    print(f"State: {state:<10} | Total: {counts['TOTAL']} ({types_str})")
