import csv, time
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

# Configuration
BASE_URL = "https://nahlizenidokn.cuzk.gov.cz/VyberBudovu/Stavba/InformaceO"
HEADLESS = False

def get_page(page, url):
    # Load the website, wait for content to load, and check for potential blocks
    page.goto(url, wait_until="domcontentloaded", timeout=60000)
    time.sleep(1)
    if "security" in page.title().lower() or "checkpoint" in page.content().lower():
        print(f"Blocked (checkpoint): {url}. Resolve in browser and press Enter...")
        input()
    return BeautifulSoup(page.content(), "html.parser")

def smart_type_address(page, address):
    # Smart character-by-character typing with suggestion detection
    for char in address:
        page.keyboard.type(char)
        page.wait_for_timeout(400)
        
        suggestions = page.locator(".autocomplete-suggestion")
        if suggestions.count() == 1:
            print(f"  Found unique suggestion: {suggestions.first.inner_text()}")
            suggestions.first.click()
            break

def get_building_size(page):
    soup = BeautifulSoup(page.content(), "html.parser")
    # Searching for "Výměra" row and taking the second cell
    for tr in soup.find_all("tr"):
        tds = tr.find_all("td")
        if len(tds) >= 2 and "Výměra" in tds[0].text:
            return tds[1].text.strip()
    

def enrich_building_size(output_file):
    # Read existing data into memory
    rows = []
    with open(output_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames) if reader.fieldnames else []
        rows = list(reader)
    
    # Ensure our new column exists in header
    if "land_size_katastr" not in fieldnames:
        fieldnames.append("land_size_katastr")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS, args=["--disable-blink-features=AutomationControlled"])
        page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
        page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
        for row in rows:
            facility = row.get("facility_name", "")
            address = f"{row.get('street', '')} {row.get('city', '')}".strip()
            if not address or address == " ": continue
            
            print()
            print(f"Enriching: {address}")
            get_page(page, BASE_URL)

            input_selector = "#ctl00_bodyPlaceHolder_txtAdresa"
            page.wait_for_selector(input_selector)
            page.click(input_selector)

            smart_type_address(page, address)
            
            # Wait for the results page to load
            page.wait_for_load_state("networkidle")
            time.sleep(2)
            
            size_val = get_building_size(page) 

            if size_val:
                print(f"  Found land size for {facility}: {size_val}")
                row["land_size_katastr"] = size_val
            else:
                print(f"  Land size not found for {facility}.")
                row["land_size_katastr"] = ""

        # Final write back to the CSV
        with open(output_file, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
        
        print(f"Done! Updated {output_file} with building sizes.")
        browser.close()