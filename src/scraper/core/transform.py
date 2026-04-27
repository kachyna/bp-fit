import csv, re

PLOT_TO_BUILDING_RATIO = 0.8

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

def transform_data(output_file):
    rows = []
    with open(output_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        rows = list(reader)

    # 1. Calculate ratios from available data
    white_build_ratios = []
    mw_white_ratios = []

    for row in rows:
        mw = parse_value(row.get("Spec: Fully Built-Out Power"))
        white = parse_value(row.get("Spec: Fully Built-Out Whitespace"))
        build = parse_value(row.get("Spec: Total Building Size"))

        if white and build and build > 0:
            white_build_ratios.append(white / build)
        
        if mw and white and white > 0:
            mw_white_ratios.append(mw / white)

    # Average ratios
    avg_white_build = sum(white_build_ratios) / len(white_build_ratios) if white_build_ratios else 0.5
    avg_mw_white = sum(mw_white_ratios) / len(mw_white_ratios) if mw_white_ratios else 0.002 # Default if no data

    print(f"Calculated Ratios:")
    print(f"  Whitespace/Building Ratio: {avg_white_build:.4f}")
    print(f"  MW/Whitespace Ratio: {avg_mw_white:.4f}")

    # 2. Apply transformations
    for row in rows:
        # Get basic values
        mw_val = parse_value(row.get("Spec: Fully Built-Out Power"))
        white_val = parse_value(row.get("Spec: Fully Built-Out Whitespace"))
        build_val = parse_value(row.get("Spec: Total Building Size"))
        
        # Plot size from Katastr or Spec
        plot_val = parse_value(row.get("land_size_katastr")) or parse_value(row.get("Spec: Total Plot Size"))

        # Transformation Logic
        # - if building_size missing: building_size = plot_size * 0.8
        if not build_val and plot_val:
            build_val = plot_val * PLOT_TO_BUILDING_RATIO
            row["Spec: Total Building Size"] = f"{build_val:.2f} sq.m. (est)"

        # - if whitespace missing: whitespace = building_size * white_building_ratio
        if not white_val and build_val:
            white_val = build_val * avg_white_build
            row["Spec: Fully Built-Out Whitespace"] = f"{white_val:.2f} sq.m. (est)"

        # - if mw missing: mw = white * mw_white_ratio
        if not mw_val and white_val:
            mw_val = white_val * avg_mw_white
            row["Spec: Fully Built-Out Power"] = f"{mw_val:.3f} MW (est)"

    # Save transformed data
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Transformation completed for {output_file}")
