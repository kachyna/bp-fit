
# BP FIT ČVUT: Investice do AI infrastruktury

**Abstrakt**

Přestože se uživatelům může umělá inteligence jevit jako nehmotná entita existující v cloudu, její trénování a inference vyžadují rozsáhlou fyzickou infrastrukturu. Výstavba a následný provoz těchto výpočetních center představují jak příležitost pro ekonomiku, tak významnou zátěž pro životní prostředí a elektrizační soustavu. Pro posouzení jejich dopadů v České republice byly na základě empirických dat z USA identifikovány proměnné s největším vlivem na ekonomiku, energetiku a oblast ESG. Tyto poznatky byly následně upraveny s ohledem na specifika České republiky a integrovány do prediktivního matematického modelu.

Výsledky naznačují, že z pohledu národního hospodářství není výstavba datových center jednoznačně přínosná, zejména z důvodu nízké tvorby pracovních míst a omezených daňových příjmů. Významnou limitací je rovněž kapacita přenosové soustavy a lokální dostupnost zdrojů vody pro chlazení. Ze strategického hlediska však rozvoj této infrastruktury hraje důležitou roli v udržení technologické a národní suverenity.

## Přehled o projektu

Tento repozitář obsahuje jak zdrojové kódy pro samotný text práce (LaTeX), tak pro doprovodnou webovou aplikaci (React). Spojení do jednoho repozitáře bylo zvoleno kvůli zachování konzistence a provázanosti obou částí v rámci odevzdání bakalářské práce, ačkoliv za standardních okolností by bylo vhodnější rozdělit projekty do dvou samostatných repozitářů.

### Text a literární část

Zdrojové soubory bakalářské práce se nacházejí v adresáři [src/thesis/](src/thesis/). Text je pro lepší přehlednost a modularitu rozdělen do více částí:

- **Hlavní soubor:** [ctufit-thesis.tex](src/thesis/ctufit-thesis.tex) (hlavní dokument, metadata a importy).
- **Kapitoly:** Jednotlivé kapitoly práce jsou uloženy v adresáři [src/thesis/text/chapters/](src/thesis/text/chapters/).
- **Přílohy a metadata:** Soubory jako reference ([references.bib](src/thesis/text/references.bib)) nebo přílohy se nacházejí v [src/thesis/text/](src/thesis/text/).
- **Build:** Výsledné PDF se po kompilaci generuje do cesty [out/text/ctufit-thesis.pdf](out/text/ctufit-thesis.pdf). (Pozn.: Složka `out/` je v repozitáři ignorována, kromě finálních exportů).

### Kód a praktická část

Praktickou část projektu tvoří vytvoření modelu, který počítá a popisuje socioeknomické dopady výstavby datových center v České republice.
Součástí je vytvoření webové aplikace, která výpočty vizualizuje a prezentuje v přehledné formě pro laickou i odbornou veřejnost.
V tomto dokumentu je popsána pouze technická stránka aplikace, samotná metodologie modelu je součástí LaTeXové části práce.

#### Stack a závislosti

Aplikace je postavena na moderních webových technologiích:
- Javascript,
- React,
- Zustand a Immer,
- Tailwind CSS,
- Recharts,
- Lucide React,
- Shadcn UI,
- a Framer Motion.

Tento stack umožňuje interaktivní vizualizaci dat a responzivní design.
Technologie React navíc umožňuje okamžité přepisování komponent při změně parametrů modelu,
díky čemuž je výstup rychlý, intuitivní a uživatelsky přívětivý.

#### Architektura aplikace

Cílem aplikace je počítat spotřebu, uhlíkovou stopu nebo hrubou přidanou hodnotu celého portfolia datových center.
Přímočarým řešením by tedy bylo stahovat datová centra, sečíst jejich parametry a z nich poté vypočítat výsledné dopady.
Tento přístup má však několik nedostatků: 
- Neumožňuje sledovat přínosy jednotlivých datových center.
- Je neefektivní, jelikož by se při každé změně musela přepočítat všechna data, nedají se totiž cachovat dílčí výsledky.

Aplikace je proto založená na okamžitém obohacování zadaných dat:
- Po zadání datového centra dojde k vypočítání modelových parametrů pro dané datové centrum.
- Uživatel má možnost zjistit, jaký přínos do celku má konkrétní datové centrum.
- Tento mezivýsledek se následně uloží k původnímu objektu datového centra, aby se nemusel přepočítávat.
- Ze všech těchto dílčích výsledků se prostým součtem vypočítají výsledné hodnoty pro celé portfolio.

Při změně vstupních datových center se pak provádí pouze obohacení daného DC a součet přes všechny DC (složitost O(n)). Alternativně by šlo výsledky uložit a následně od nich odečítat/přičítat pouze změněné hodnoty pro dosažení složitosti O(1), nicméně tato implementační komplexita do modelu zanesena nebyla.

Součet nad datovými centry se při změně provede v hlavní komponentě, která pak vypočítaná data předá grafům a dalším komponentám k zobrazení. Neukládá se do storu ani jiného globálního stavu, grafy si data v podstatě vyžádají v momentě, kdy je uživatel zobrazí.

#### Odkaz na živou verzi aplikace

Aplikace byla nasazena na server na doméně [BP FIT ČVUT - Model datových center](https://bp-kachyna.ksi.in.fit.cvut.cz).
Server má nicméně omezenou platnost do konce února 2027, kvůli čemuž aplikace později nemusí být dosutpná. Odkaz případně aktualizuju. 

#### Jak aplikaci spustit lokálně

Celá webová aplikace je kontejnerizovaná, takže ji lze snadno spustit i v lokálním prostředí:

1. Nainstalujte si Docker Desktop (pokud nemáte)
2. Ve složce `bp-fit/src/model-app` spusťte příkaz: `docker compose up --build`
3. Po dokončení kompilace by měla být aplikace dostupná na adrese [http://localhost:5173](http://localhost:5173/)
4. Po dokončení práce kontejnery zastavte příkazem: `docker compose down`

Poznámka: Tímto se spustí vývojové prostředí, nikoli produkční verze aplikace.

#### Návod na spuštění na serveru

Aplikace je kontejnerizovaná a dostupná v Docker image s tagem `kachyna/model-app:latest`.

**Pro vydání nové verze:**
1. Nejprve se přihlaste k docker registru: `docker login`
2. Ve složce `src/model-app` spusťte příkaz: `docker build --platform linux/amd64 -t kachyna/model-app:latest -f docker/Dockerfile.prod .`
3. A nakonec pushněte image: `docker push kachyna/model-app:latest`

**Pro nasazení nové verze:**
1. Na server nahrajte docker compose soubor `docker-compose.prod.yml` ze složky `model-app/docker`
1. Na serveru zastavte běžící kontejnery `docker compose -f docker-compose-prod.yml down -v`
1. Pullněte nový image `docker compose -f docker-compose-prod.yml pull`
1. A spusťte kontejner `docker compose -f docker-compose-prod.yml up -d`

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