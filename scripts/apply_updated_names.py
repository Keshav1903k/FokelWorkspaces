import json
import csv

PROPERTIES_JSON_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"
CSV_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\updated_property_names.csv"
DATA_TS_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\src\constants\data.ts"

def update_property_names():
    with open(PROPERTIES_JSON_PATH, "r", encoding="utf-8") as f:
        props = json.load(f)

    with open(CSV_PATH, "r", encoding="utf-8") as f:
        csv_rows = list(csv.DictReader(f))

    mapping = {r["Internal Name (do not show)"].strip().lower(): r for r in csv_rows}

    updated_props = []
    for p in props:
        current_name = (p.get("internalName") or p.get("title") or p.get("name") or "").strip().lower()
        matched_r = None
        for k, r in mapping.items():
            if k == current_name or k in current_name or current_name in k:
                matched_r = r
                break

        if matched_r:
            old_slug = p.get("slug")
            p["internalName"] = matched_r["Internal Name (do not show)"].strip()
            p["title"] = matched_r["Display Name"].strip()
            p["name"] = matched_r["Display Name"].strip()
            p["shortId"] = matched_r["Short ID"].strip()
            p["url"] = matched_r["URL Slug"].strip()
            p["seoTitle"] = matched_r["SEO Title"].strip()
            p["stateCode"] = matched_r["State Code"].strip()
            p["slug"] = matched_r["Short ID"].strip().lower()
            if old_slug and old_slug != p["slug"]:
                p["legacySlug"] = old_slug
        updated_props.append(p)

    with open(PROPERTIES_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(updated_props, f, indent=2)

    with open(DATA_TS_PATH, "r", encoding="utf-8") as f:
        ts_content = f.read()

    start_marker = "export const WORKSPACES: WorkspaceSpace[] = ["
    end_marker = "export const TIMELINE_STEPS = ["
    s_idx = ts_content.find(start_marker)
    e_idx = ts_content.find(end_marker)

    if s_idx != -1 and e_idx != -1:
        new_ts = (
            ts_content[:s_idx]
            + "export const WORKSPACES: WorkspaceSpace[] = "
            + json.dumps(updated_props, indent=2)
            + ";\n\n"
            + ts_content[e_idx:]
        )
        with open(DATA_TS_PATH, "w", encoding="utf-8") as f:
            f.write(new_ts)
        print("Successfully updated src/constants/data.ts with new property names and URLs!")
    else:
        print("Markers not found in data.ts")

if __name__ == "__main__":
    update_property_names()
