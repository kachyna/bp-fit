
# BP FIT ČVUT: Investice do AI infrastruktury

## TODOS před odevzdáním:
- Seřadit zkratky podle abecedy
- Vyřešit přetékání v bibliografii


### Checklist pro každou kapitolu
-  \cite[s. x] -> ~cite[s.~x]
-  \ref -> ~\ref
-  nbsp za čísla s jednotkou
-  nbsp před procenta

---

## Přehled o projektu

### Text a literární část

### Kód a praktická část

#### Závislosti

#### Jak kód spustit

---

## Struktura výstupů (`out/`)

Složka `out/` slouží pro ukládání artefaktů generovaných ze složky `src/`.

### `out/text/`
Obsahuje výstupní soubory z kompilace LaTeXu (včetně výsledného PDF bakalářské práce).

### `out/csv/`
Obsahuje datové dokumenty a exporty z analytické části.

- **`scraped-data.csv`**
  - **Popis**: Surový výstup příkazu:
    `python3 script.py --scrape --enrich --path [path-to-root-folder]/bp-fit/out/csv/scraped-data.csv`
  - **Obsah**: Data stažená z *Data Center Map* a obohacená o velikosti pozemků z *Nahlížení do Katastru nemovitostí* k datu **27. 4. 2026**.
  - **Poznámka**: Toto je aktuální pracovní verze dokumentu. Skript v tomto režimu (scrape + enrich) již nebude znovu spouštěn, aby nedošlo k přepsání manuálně ověřených dat.

- **`manually-enriched-data.csv`**
  - **Popis**: Dokument vzniklý manuálním doplňováním dat k vybraným záznamům.
  - **Obsah**: Informace dohledané z veřejně dostupných zdrojů (výroční zprávy, tiskové zprávy operátorů, oborové portály), které automatizovaný scraper nedokázal zachytit.
  - **Sloupec `zdroje`**: Na konec dokumentu je přidán sloupec obsahující URL odkazy na konkrétní zdroje dat pro snadnou ověřitelnost a citaci v textu práce.

- **`transformed-data.csv`**
  - **Popis**: Kopie `manually-enriched-data.csv`, na kterou byl spuštěn transformační krok pomocí:
    `python3 script.py --transform --path [path-to-root-folder]/bp-fit/out/csv/transformed-data.csv`
  - **Obsah**: Původní manuálně ověřená data, u kterých byly doplněny odhadované hodnoty (např. odhadované MW nebo whitespace) podle transformačních pravidel v `src/scraper/core/transform.py`.

- **`transformed-data-analyzed.csv`**
  - **Popis**: Výstup analytického kroku aplikovaného na `transformed-data.csv` pomocí:
    `python3 src/scraper/script.py --analyze --path [path-to-root-folder]/bp-fit/out/csv/transformed-data.csv`
  - **Obsah**: Agregační statistiky na úrovni poskytovatelů (součet MW, součet whitespace, počet DC, počet DC s uvedeným MW/whitespace, průměrné MW na DC apod.).

---

## Šablona pro závěrečné práce FIT ČVUT

Pro vypracování dokumentu ve formátu LaTeX byla použita šablona Fakulty informačních technologií ČVUT, jejímž spravovatelem je [Tomáš Nováček](https://usermap.cvut.cz/profile/novacto3). Šablonu je možné získat přes univerzitní [GitLab](https://gitlab.fit.cvut.cz/theses-templates/FITthesis-LaTeX).