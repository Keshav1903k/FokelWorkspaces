import json

PROPERTIES_JSON_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\data\properties.json"
DATA_TS_PATH = r"c:\Users\HP\OneDrive\Desktop\Aggregator2\Aggregator-main\src\constants\data.ts"

def get_generic_address(p):
    raw = p.get('address', '')
    loc = p.get('locality', '')
    city = p.get('city', '')
    internal = p.get('internalName', '')

    if 'Asaf Ali Road' in loc:
        return 'Asaf Ali Road, Central Delhi'
    if 'Connaught Place' in loc:
        if 'M Block' in raw or 'Outer' in raw:
            return 'Outer Circle, Connaught Place, New Delhi'
        if 'Panchkuian' in raw:
            return 'Panchkuian Marg, Connaught Place, New Delhi'
        if 'Naurang' in internal or 'Kasturba' in raw or 'KG' in raw:
            return 'KG Marg, Connaught Place, New Delhi'
        if 'Block L' in raw:
            return 'Block L, Connaught Place, New Delhi'
        return 'Barakhamba Road, Connaught Place, New Delhi'
    if 'Nehru Place' in loc:
        if 'Lala' in raw or 'Vardhman' in internal:
            return 'Lala Lajpat Rai Road, Nehru Place, New Delhi'
        if 'Chandra' in internal:
            return 'Main Commercial Complex, Nehru Place, New Delhi'
        if 'Hemkunt' in internal:
            return 'Commercial Enclave, Nehru Place, New Delhi'
        if 'Trade Tower' in internal or 'IFCI' in internal:
            return 'Business District, Nehru Place, New Delhi'
        if 'Chirag' in raw or 'B-18' in internal:
            return 'Outer Ring Road, Nehru Place, New Delhi'
        return 'Main Market Commercial Area, Nehru Place, New Delhi'
    if 'Saket' in loc:
        if 'District' in raw or 'Fort' in internal:
            return 'District Centre, Saket, New Delhi'
        if 'Westend' in raw or 'Saidulajab' in raw or 'Zo' in internal or 'MIO' in internal:
            return 'Westend Marg, Saidulajab, Saket, New Delhi'
        return 'Saket Commercial Sector, New Delhi'
    if 'Aerocity' in loc:
        return 'Hospitality District, Aerocity, New Delhi'
    if 'Janakpuri' in loc:
        if 'Subhash Nagar' in internal or 'Meenakshi' in raw or '4U' in internal:
            return 'Najafgarh Road, Subhash Nagar, New Delhi'
        return 'District Centre, Janakpuri, New Delhi'
    if 'Netaji Subhash Place' in loc:
        return 'Ring Road, Netaji Subhash Place, Pitampura, New Delhi'
    if 'DLF Cyber City' in loc:
        return 'DLF Cyber City, Phase 2, Gurugram'
    if 'Udyog Vihar' in loc:
        return 'Phase IV, Udyog Vihar, NH-48 Corridor, Gurugram'
    if 'Sector 39' in loc:
        return 'Sector 39, Jharsa Road, Gurugram'
    if 'Sector 48' in loc:
        return 'Sohna Road Expressway, Sector 48, Gurugram'
    if 'Golf Course Road' in loc:
        return 'Golf Course Road, DLF Phase 5, Gurugram'
    if 'Golf Course Extension' in loc:
        return 'Golf Course Extension Road, Sector 65, Gurugram'
    if 'Sector 62' in loc:
        return 'Electronic City IT Belt, Sector 62, Noida'
    if 'Marathahalli' in loc:
        return 'Marathahalli Outer Ring Road, Bangalore'
    if 'Koramangala' in loc:
        return 'Hosur Main Road, Koramangala 1st Block, Bangalore'
    if 'Bellandur' in loc:
        return 'Outer Ring Road Tech Corridor, Bellandur, Bangalore'
    if 'BKC' in loc:
        return 'G Block, Bandra Kurla Complex (BKC), Mumbai'
    if 'HITEC City' in loc:
        return 'Cyber Towers Corridor, HITEC City, Madhapur, Hyderabad'
    if 'Koregaon Park' in loc:
        return 'North Main Road, Koregaon Park, Pune'
    
    return f'{loc}, {city}'

def apply_addresses():
    with open(PROPERTIES_JSON_PATH, 'r', encoding='utf-8') as f:
        props = json.load(f)

    for p in props:
        # Preserve original full address privately under internalAddress
        if 'internalAddress' not in p and p.get('address'):
            p['internalAddress'] = p['address']
        p['address'] = get_generic_address(p)

    with open(PROPERTIES_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(props, f, indent=2)

    with open(DATA_TS_PATH, 'r', encoding='utf-8') as f:
        ts_content = f.read()

    start_marker = "export const WORKSPACES: WorkspaceSpace[] = ["
    end_marker = "export const TIMELINE_STEPS = ["
    s_idx = ts_content.find(start_marker)
    e_idx = ts_content.find(end_marker)

    if s_idx != -1 and e_idx != -1:
        new_ts = (
            ts_content[:s_idx]
            + "export const WORKSPACES: WorkspaceSpace[] = "
            + json.dumps(props, indent=2)
            + ";\n\n"
            + ts_content[e_idx:]
        )
        with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
            f.write(new_ts)
        print("Successfully updated addresses in data.ts and properties.json!")
    else:
        print("Markers not found in data.ts")

if __name__ == '__main__':
    apply_addresses()
