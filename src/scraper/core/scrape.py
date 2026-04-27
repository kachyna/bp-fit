import csv, time
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from urllib.parse import urljoin

# Configuration
BASE_URL = "https://www.datacentermap.com"
START_URL = f"{BASE_URL}/czech-republic/"
HEADLESS = False
SLOW_MODE = False
SLOW_MODE_TIMEOUT = 2  # seconds to wait between requests in slow mode

def get_page(page, url):
    # Load the website, wait for content to load, and check for potential blocks
    page.goto(url, wait_until="domcontentloaded", timeout=60000)
    time.sleep(1)
    if "security" in page.title().lower() or "checkpoint" in page.content().lower():
        print(f"Blocked (checkpoint): {url}. Resolve in browser and press Enter...")
        input()

    soup = BeautifulSoup(page.content(), "html.parser")

    # Rate limiter check - search in the entire page text
    while "You're in the Right Place – but at Full Capacity!" in soup.get_text():
        print("    Rate limit detected! Waiting 5s...")
        time.sleep(5)
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
        soup = BeautifulSoup(page.content(), "html.parser")

    return soup

def get_markets(page, url):
    print(f"Loading market list from {url}...")
    soup = get_page(page, url)
    markets = []
    for a in soup.select("table td a[href^='/czech-republic/']"):
        url = urljoin(BASE_URL, a['href'])
        if url.strip('/') != START_URL.strip('/'):
            markets.append({"name": a.text.strip(), "url": url})

    print(f"Found {len(markets)} markets.")
    return markets

def get_dcs(page, url, market_name):
    print(f"------------------------------")
    print(f"{market_name}")

    soup = get_page(page, url)
    links = set()
    
    for a in soup.find_all("a", href=True):
                href = a['href'].split('?')[0].split('#')[0].strip('/')
                parts = href.split('/')
                if len(parts) == 3 and parts[0] == 'czech-republic' and parts[2] not in ['quote', 'specs', 'ecosystem', 'gallery']:
                    links.add(urljoin(BASE_URL, '/' + href + '/'))

    print(f"Found {len(links)} data centers.")
    print(f"------------------------------")
    return links

def get_dc_data(page, link, market):
    try:
        print(f"  Fetching data from: {link}")
        dc_soup = get_page(page, urljoin(link, "specs/"))        
        op_link = dc_soup.select_one("a[href^='/c/']")
        
        name_tag = dc_soup.select_one("h2.customheader") or dc_soup.find("h1")

        addr_parts = list(op_link.parent.stripped_strings) if op_link else []

        if addr_parts and addr_parts[0] == (op_link.text.strip() if op_link else ""):
            addr_parts.pop(0)

        if len(addr_parts) > 0:
            street = addr_parts[0].split(",")[1].strip() if "," in addr_parts[0] else addr_parts[0].strip()
        else:
            street = ""

        data = {
            "facility_name": name_tag.text.strip() if name_tag else "",
            "operator": op_link.text.strip() if op_link else "",
            "street": street,
            "postal_code": addr_parts[1].strip() if len(addr_parts) > 1 else "",
            "city": addr_parts[2].strip() if len(addr_parts) > 2 else "",
            "market": market['name'],
            "url": link
        }
        
        # Specification extraction with prefix and empty key handling
        for row in dc_soup.select("table tr"):
            cells = row.find_all("td")
            if len(cells) >= 2:
                key = cells[0].text.strip()
                if key:
                    val = cells[1].text.strip() or ("Yes" if cells[1].select_one(".fa-check") else "No")
                    data[f"Spec: {key}"] = val
        
        time.sleep(0.5)
        print(f"  Extracted: {data['facility_name']} ({data['operator']})")
        print(" ")
        return data

    except Exception as e:
        print(f"  Error at {link}: {e}")
        print(" ")

def scrape(output_file, limit = None):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS)
        page = browser.new_page(user_agent="Mozilla/5.0 Chrome/124.0.0.0")
        
        # Get all available markets from base url
        markets = get_markets(page, START_URL)

        results = []
        for market in markets:
            if limit and len(results) >= limit:
                    break

            links = get_dcs(page, market['url'], market['name'])
            time.sleep(SLOW_MODE_TIMEOUT) if SLOW_MODE else None

            for dc_link in links:
                if limit and len(results) >= limit:
                    break
                
                data = get_dc_data(page, dc_link, market)
                if data:
                    results.append(data)
                
        # Final CSV write
        if results:
            core_fields = ["facility_name", "operator", "street", "postal_code", "city", "market", "url"]
            # Get all keys and filter out any empty strings
            all_keys = {k for d in results for k in d.keys() if k}
            other_fields = sorted([k for k in all_keys if k not in core_fields])
            fieldnames = core_fields + other_fields
            
            with open(output_file, "w", newline="", encoding="utf-8") as f:
                # extrasaction='ignore' ensures it doesn't crash if an extra key is present
                writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
                writer.writeheader()
                writer.writerows(results)
            print(f"Done! Saved {len(results)} records to {output_file}")

        browser.close()
