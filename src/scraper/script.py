from core.scrape import scrape
from core.enrich_building_size import enrich_building_size as enrich

TEST_MODE = True
OUTPUT_FILE = "cz-datacenters.csv" if not TEST_MODE else "test-cz-datacenters.csv"

def run_pipeline(file_path):

    print("\nStarting scraping phase...")
    # scrape(file_path, limit=5 if TEST_MODE else None)
    print("\nScraping completed. Starting enrichment phase...")
    enrich(file_path)
    print("\nEnrichment completed. Starting transformation phase...")

if __name__ == "__main__":
    print("Starting the data pipeline...")
    run_pipeline(OUTPUT_FILE)
    print("\nPipeline completed successfully. Output saved to current directory as", OUTPUT_FILE)
