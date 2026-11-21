import os
import json
import re

DATA_TS_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\src\constants\data.ts"
PROPERTIES_JSON_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"
IMAGES_DIR = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\public\images\properties"

def main():
    with open(PROPERTIES_JSON_PATH, "r", encoding="utf-8") as f:
        properties = json.load(f)

    for prop in properties:
        slug = prop.get("slug")
        folder = os.path.join(IMAGES_DIR, slug)
        if os.path.isdir(folder):
            imgs = [f"/images/properties/{slug}/{fn}" for fn in sorted(os.listdir(folder)) if fn.endswith(".jpg")]
            if imgs:
                prop["image"] = imgs[0]
                prop["images"] = imgs
            else:
                prop["images"] = [prop["image"]]
        else:
            prop["images"] = [prop["image"]]

    with open(PROPERTIES_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(properties, f, indent=2)

    # Now update src/constants/data.ts
    with open(DATA_TS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Find export const WORKSPACES: WorkspaceSpace[] = [ ... ];
    prefix = "export const WORKSPACES: WorkspaceSpace[] = "
    idx = content.find(prefix)
    if idx != -1:
        # Format properties array as TS
        json_str = json.dumps(properties, indent=2)
        end_idx = content.find(";\n\nexport const SERVICES", idx)
        if end_idx == -1:
            end_idx = content.find(";\nexport const SERVICES", idx)

        if end_idx != -1:
            new_content = content[:idx + len(prefix)] + json_str + content[end_idx:]
            with open(DATA_TS_PATH, "w", encoding="utf-8") as f:
                f.write(new_content)
            print("Successfully updated src/constants/data.ts!")
        else:
            print("Could not find end of WORKSPACES array in data.ts")

    print("Successfully updated data/properties.json!")

if __name__ == "__main__":
    main()
