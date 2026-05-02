import argparse
from core.scrape import scrape
from core.enrich_building_size import enrich_building_size as enrich
from core.transform import transform_data
from core.analyze_data import analyze

DEFAULT_PATH    = "cz-datacenters.csv"
TEST_PATH       = "test-cz-datacenters.csv"

def run_pipeline(file_path, run_scrape=False, run_enrich=False, run_transform=False, run_analyze=False, test_mode=False, limit=None):
    if run_scrape:
        print(f"\n--- Starting scraping phase ({file_path}) ---")
        scrape_limit = limit if limit else (5 if test_mode else None)
        scrape(file_path, limit=scrape_limit)
    
    if run_enrich:
        print(f"\n--- Starting enrichment phase ({file_path}) ---")
        enrich(file_path)
    
    if run_transform:
        print(f"\n--- Starting transformation phase ({file_path}) ---")
        transform_data(file_path)

    if run_analyze:
        print(f"\n--- Starting analysis phase ({file_path}) ---")
        analyze(file_path, file_path.replace(".csv", "-analyzed.csv"))
    

def main():
    parser = argparse.ArgumentParser(description="Data Center Map Scraper & Transformer")
    
    # Flags for phases
    parser.add_argument("--scrape", action="store_true", help="Run the scraping phase")
    parser.add_argument("--enrich", action="store_true", help="Run the katastr enrichment phase. After this phase, the file can be manually enriched (by editing the CSV file) before the transformation phase.")
    parser.add_argument("--transform", action="store_true", help="Run the data transformation phase")
    parser.add_argument("--analyze", action="store_true", help="Run the data analysis phase")
    parser.add_argument("--all", action="store_true", help="Run all phases in sequence")
    
    # Configuration
    parser.add_argument("--test", action="store_true", help="Use test mode (limited records and test output file)")
    parser.add_argument("--path", type=str, help="Custom path for the CSV file")
    parser.add_argument("--limit", type=int, help="Limit the number of records to scrape. This only affect the scraping phase, and is useful for testing.")

    args = parser.parse_args()

    # Determine file path
    default_file = TEST_PATH if args.test else DEFAULT_PATH
    file_path = args.path if args.path else default_file

    # Logic for running phases
    if not (args.scrape or args.enrich or args.transform or args.analyze or args.all):
        parser.print_help()
        return

    run_pipeline(
        file_path, 
        run_scrape=(args.scrape or args.all),
        run_enrich=(args.enrich or args.all),
        run_transform=(args.transform or args.all),
        run_analyze=(args.analyze or args.all),
        test_mode=args.test,
        limit=args.limit
    )
    
    print(f"\nPipeline finished. Working file: {file_path}")

if __name__ == "__main__":
    main()
