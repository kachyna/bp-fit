import csv
import re
from pathlib import Path

# Extracts numeric value from strings like '0.15 MW', '250 sq.m.', etc.
def parse_value(value):
    if not value or value.strip() == "":
        return None
    
    # Extract number
    match = re.search(r"([0-9]+[.]?[0-9]*)", value.replace(" ", "").replace(",", ""))
    if not match:
        return None
    
    num = float(match.group(1).replace(",", ""))
    
    # Handle units
    val_lower = value.lower()
    if "kw" in val_lower:
        num /= 1000.0  # Convert kW to MW
    elif "sq.ft" in val_lower:
        num *= 0.092903  # Convert sq.ft to sq.m
        
    return num

def analyze(input_path, output_path, top=10):
    input_path = Path(input_path)
    output_path = Path(output_path)
    with input_path.open('r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    providers = {}
    total_mw = 0.0
    total_whitespace = 0.0
    for row in rows:
        op = (row.get('operator') or '').strip() or '(unknown)'
        stats = providers.setdefault(op, {
            'total_mw': 0.0,
            'total_whitespace': 0.0,
            'dc_total': 0,
            'dc_with_mw': 0,
            'dc_with_whitespace': 0,
        })
        stats['dc_total'] += 1

        mw = parse_value(row.get('Spec: Fully Built-Out Power'))
        if mw:
            stats['total_mw'] += mw
            stats['dc_with_mw'] += 1
            total_mw += mw

        white = parse_value(row.get('Spec: Fully Built-Out Whitespace'))
        if white:
            stats['total_whitespace'] += white
            stats['dc_with_whitespace'] += 1
            total_whitespace += white

    # prepare output dir
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ['operator','total_mw_mw','total_whitespace_m2','dc_total','dc_with_mw','dc_with_whitespace','avg_mw_per_dc']
    with output_path.open('w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for op, s in sorted(providers.items(), key=lambda kv: kv[1]['total_mw'], reverse=True):
            avg = s['total_mw'] / s['dc_total'] if s['dc_total'] else 0.0
            writer.writerow({
                'operator': op,
                'total_mw_mw': f"{s['total_mw']:.3f}",
                'total_whitespace_m2': f"{s['total_whitespace']:.1f}",
                'dc_total': s['dc_total'],
                'dc_with_mw': s['dc_with_mw'],
                'dc_with_whitespace': s['dc_with_whitespace'],
                'avg_mw_per_dc': f"{avg:.3f}",
            })

    # Print summary
    print(f"Analyzed {len(rows)} datacenters from {input_path}")
    print(f"Estimated total MW (sum): {total_mw:.3f} MW")
    print(f"Estimated total whitespace (sum): {total_whitespace:.1f} m^2")
    print(f"Provider stats written to: {output_path}")
    print("Top providers by MW:")
    for i, (op, s) in enumerate(sorted(providers.items(), key=lambda kv: kv[1]['total_mw'], reverse=True)[:top], start=1):
        print(f"{i}. {op}: {s['total_mw']:.3f} MW — {s['dc_total']} DCs ({s['dc_with_mw']} with MW, {s['dc_with_whitespace']} with whitespace)")
