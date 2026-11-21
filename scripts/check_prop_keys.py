import json

with open(r'c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json', 'r', encoding='utf-8') as f:
    props = json.load(f)

print("Keys:", list(props[0].keys()))
print("Prop 1:", {k: props[0][k] for k in ['id', 'shortId', 'title', 'city', 'stateCode', 'category', 'type', 'workspaceType'] if k in props[0]})
print("Prop 46 (Virtual Office):", {k: props[45][k] for k in ['id', 'shortId', 'title', 'city', 'stateCode', 'category', 'type', 'workspaceType'] if k in props[45]})
