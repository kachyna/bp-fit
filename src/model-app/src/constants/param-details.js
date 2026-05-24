/*
This file contains the definitions of all parameters used in the model, including their labels, descriptions, and categories.
Categories are: 'tax_rates', 'economy', 'energy', 'environment', 'dc_specific'
*/

export const PARAM_DETAILS = {
  taxIncomeRate: {
    label: "Sazba daně z příjmu FO",
    description: "Zákonná sázba daně z příjmů fyzických osob používaná pro výpočet čistého zisku po zdanění.",
    category: "tax_rates"
  },
  yearlyTaxDiscount: {
    label: "Roční sleva na dani (Kč)",
    description: "Základní roční sleva na dani na poplatníka nebo jiné uplatnitelné legislativní úlevy.",
    category: "tax_rates"
  },
  contributionsEmployerRate: {
    label: "Odvody zaměstnavatele",
    description: "Procento z hrubé mzdy, které zaměstnavatel povinně odvádí na sociální a zdravotní pojištění za své zaměstnance.",
    category: "tax_rates"
  },
  contributionsEmployeeRate: {
    label: "Odvody zaměstnance",
    description: "Procento z hrubé mzdy, které se zaměstnanci automaticky strhává na sociální a zdravotní pojištění.",
    category: "tax_rates"
  },
  taxEcologyMWhRate: {
    label: "Ekologická daň (Kč/MWh)",
    description: "Zákonná daň z elektřiny v ČR uvalená na každou spotřebovanou megawatthodinu.",
    category: "tax_rates"
  },
  taxBuildingM2Rate: {
    label: "Daň ze staveb (Kč/m²)",
    description: "Základní roční sazba daně z nemovitých věcí za každý metr čtvereční zastavěné plochy budovy.",
    category: "tax_rates"
  },
  taxLandM2Rate: {
    label: "Daň z pozemků (Kč/m²)",
    description: "Základní roční sazba daně z nemovitých věcí za každý metr čtvereční celkové plochy pozemku.",
    category: "tax_rates"
  },
  kLocation: {
    label: "Koeficient lokality",
    description: "Místní koeficient určený konkrétní obcí, kterým se násobí základní sazba daně z nemovitostí.",
    category: "tax_rates"
  },
  trainingGpuCountPerMW: {
    label: "Počet GPU na 1 MW (Training)",
    description: "Odhadovaný počet instalovaných AI akcelerátorů (grafických karet) připadajících na 1 MW instalovaného IT výkonu v trénovacím scénáři.",
    category: "dc_specific"
  },
  scenarioProbability: {
    label: "Pravděpodobnosti scénářů",
    description: "Váhy jednotlivých scénářů pro výpočet celkového očekávaného výsledku modelu. Součet musí být 100 %.",
    category: "model"
  },

  // --- PARAMETRY SCÉNÁŘŮ ---
  // Investice a výstavba
  costBuildingPerMW: {
    label: "Výstavba budovy (Kč/MW)",
    description: "Celkové investiční náklady (často uváděno jako CAPEX) na stavbu, chlazení, napájení a záložní zdroje přepočtené na 1 MW instalovaného IT výkonu.",
    category: "costs"
  },
  fteBuildingPerMW: {
    label: "Pracovníci na výstavbu / MW",
    description: "Počet plných pracovních úvazků (FTE) potřebných na realizaci stavby na každý 1 MW instalovaného IT výkonu.",
    category: "employment"
  },
  wageConstruction: {
    label: "Roční mzda ve výstavbě (Kč)",
    description: "Průměrná hrubá roční mzda jednoho pracovníka ve stavební a realizační fázi projektu.",
    category: "employment"
  },
  durationConstructionYrs: {
    label: "Doba výstavby (roky)",
    description: "Odhadovaný čas od zahájení stavebních prací po finální kolaudaci a spuštění provozu.",
    category: "model"
  },

  // Provoz
  durationOperationsYrs: {
    label: "Doba provozu datacentra (roky)",
    description: "Plánovaná ekonomická životnost projektu, po kterou se předpokládá generování výnosů.",
    category: "model"
  },
  itEquipmentDepreciationPeriodYrs: {
    label: "Doba odpisování IT vybavení (roky)",
    description: "Doba, po kterou se předpokládá odpisování IT vybavení. Má vliv na výši anualizovaného CAPEXu, který se používá pro srovnání s jinými investičními přiležitostmi.",
    category: "model"
  },
  fteOperationsPerMW: {
    label: "Pracovníci v provozu / MW",
    description: "Počet stálých zaměstnanců (FTE) zajišťujících nepřetržitý chod, údržbu a bezpečnost na 1 MW IT výkonu.",
    category: "employment"
  },
  wageOperations: {
    label: "Roční mzda v provozu (Kč)",
    description: "Průměrná roční hrubá mzda technických a provozních zaměstnanců datacentra.",
    category: "employment"
  },
  priceElectricityMWh: {
    label: "Cena silové elektřiny (Kč/MWh)",
    description: "Tržní nebo dlouhodobě fixovaná cena za samotnou silovou elektřinu (bez distribučních poplatků).",
    category: "energy"
  },
  opexPercentOfTotal: {
    label: "Roční OPEX (% z investice)",
    description: "Provozní náklady na údržbu, opravy, pojištění a správu technologií, vyjádřené jako procento z celkových investovaných nákladů (na budovu i vybavení).",
    category: "costs"
  },

  // Enviro a pozemky
  emissionFactorTonnesMWh: {
    label: "Emisní faktor (t CO₂/MWh)",
    description: "Množství vyprodukovaného oxidu uhličitého na každou spotřebovanou MWh z elektrické sítě (odráží čistotu energetického mixu).",
    category: "environment"
  },
  waterConsumptionLitersMWh: {
    label: "Spotřeba vody (litry/MWh)",
    description: "Objem vody spotřebovaný na chlazení technologií (odpařováním) připadající na každou MWh IT zátěže.",
    category: "environment"
  },
  areaLandPerMW: {
    label: "Plocha pozemku (m²/MW)",
    description: "Celková výměra pozemku nutná pro samotnou budovu a veškeré technologické zázemí na 1 MW výkonu.",
    category: "environment"
  },
  ratioBuildingLand: {
    label: "Poměr plochy budovy k pozemku",
    description: "Koeficient zastavěnosti udávající, jak velké procento z celkového pozemku tvoří půdorys budovy.",
    category: "environment"
  },

  inferenceEnergyPerMillionTokensWh: {
    label: "Spotřeba na 1 mil. tokenů (Wh)",
    description: "Energetická náročnost AI modelů při generování odpovědí (inference), vyjádřená ve watthodinách na milion zpracovaných tokenů.",
    category: "dc_specific"
  },
  kGvaConstruction: {
    label: "Koeficient GVA výstavby",
    description: "Multiplikátor hrubé přidané hodnoty, vyjadřující makroekonomický přínos stavební fáze pro regionální HDP.",
    category: "economy"
  },

  occupancy: {
    label: "Cílová obsazenost datacentra",
    description: "Plánované procento pronajaté nebo aktivně využívané kapacity datacentra.",
    category: "revenue"
  },
  utilization: {
    label: "Průměrné využití (IT Load)",
    description: "Skutečné průměrné vytížení serverů a technologií vůči jejich maximálnímu deklarovanému příkonu.",
    category: "energy"
  },
  costEquipmentPerMW: {
    label: "Náklady na IT vybavení (Kč/MW)",
    description: "Kapitálové náklady (CAPEX) na nákup serverů, switchů a AI akcelerátorů přepočtené na 1 MW IT výkonu.",
    category: "costs"
  },
  priceService: {
    label: "Ceník služeb / Nájemné",
    description: "Jednotková prodejní cena: roční nájem za 1 MW (Coloc), roční pronájem 1 GPU (Training) nebo cena za 1 mil. tokenů (Inference).",
    category: "revenue"
  },
  // --- NÁKLADY NA IT VYBAVENÍ PODLE BUSINESS MODELŮ ---
  "costEquipmentPerMW-coloc": {
    label: "Náklady na IT vybavení (Colocation)",
    description: "Investiční náklady na základní síťovou infrastrukturu, rozvaděče a podpůrné IT prvky pro zákaznické servery jsou již zahrnuty v ceně výstavby budovy. Kolokační centra obvykle vlastní vybavení nemají.",
  },
  "costEquipmentPerMW-training": {
    label: "Náklady na IT vybavení (AI Training)",
    description: "Investiční náklady na nákup masivních AI akcelerátorů (GPU), specializovaných serverů a ultra-rychlé síťové architektury (InfiniBand) na 1 MW IT výkonu.",
  },
  "costEquipmentPerMW-inference": {
    label: "Náklady na IT vybavení (AI Inference)",
    description: "Investiční náklady na nákup produkčního hardwaru optimalizovaného pro rychlé generování odpovědí (vysoká propustnost, nižší latence) na 1 MW IT výkonu.",
  },
  // --- CENÍKY SLUŽEB PODLE BUSINESS MODELŮ ---
  "priceService-coloc": {
    label: "Ceník služeb – Nájemné (Colocation)",
    description: "Jednotková prodejní cena vyjádřená jako roční nájemné za pronájem 1 MW kapacity (zahrnuje pronájem prostoru, garantované chlazení a napájení).",
  },
  "priceService-training": {
    label: "Ceník služeb – Pronájem GPU (AI Training)",
    description: "Jednotková prodejní cena za komerční pronájem výpočetního výkonu, vyjádřená jako roční poplatek za jeden aktivní AI akcelerátor (GPU).",
  },
  "priceService-inference": {
    label: "Ceník služeb – Cena za tokeny (AI Inference)",
    description: "Jednotková prodejní cena za provoz AI modelů přes API, účtovaná klientům jako fixní částka za 1 milion zpracovaných nebo vygenerovaných tokenů.",
  },
  // --- OBSAZENOST (BUSINESS HLEDISKO: KOLIK KAPACIT SE PRODÁ) ---
  "occupancy-coloc": {
    label: "Cílová obsazenost (Colocation)",
    description: "Z pohledu byznysu vyjadřuje, kolik procent z celkové kapacity (prostoru a příkonu sálů) dokáže datacentrum komerčně pronajmout zákazníkům.",
  },
  "occupancy-training": {
    label: "Cílová obsazenost (AI Training)",
    description: "Z pohledu byznysu vyjadřuje komerční vytížení trénovacího clusteru – jak velký podíl z celkového instalovaného počtu GPU je úspěšně pronajat klientům.",
  },
  "occupancy-inference": {
    label: "Cílová obsazenost (AI Inference)",
    description: "Z pohledu byznysu vyjadřuje podíl dedikované serverové kapacity pro provoz hotových AI modelů, který se daří monetizovat přes klientská API.",
  },
  // --- VYUŽITÍ (ENERGETICKÉ HLEDISKO: REÁLNÁ SPOTŘEBA PRODANÝCH KAPACIT) ---
  "utilization-coloc": {
    label: "Průměrné využití IT Load (Colocation)",
    description: "Z energetického hlediska určuje, jaký podíl z již prodaných (alokovaných) kapacit klienti v průměru skutečně spotřebovávají (servery málokdy běží na 100 % jmenovitého jističe).",
  },
  "utilization-training": {
    label: "Průměrné využití IT Load (AI Training)",
    description: "Z energetického hlediska vyjadřuje průměrnou hardwarovou zátěž pronajatých GPU. Trénování AI modelů je extrémně výpočetně náročné, proto se reálná spotřeba blíží maximu.",
  },
  "utilization-inference": {
    label: "Průměrné využití IT Load (AI Inference)",
    description: "Z energetického hlediska určuje průměrný reálný příkon infrastruktury v čase, který kolísá na základě aktuálního množství uživatelských dotazů (inference) přicházejících zvenčí.",
  },
  // Metadata a popisky scénářů / modelů
  PESIMISTIC: {
    label: "Pesimistický scénář",
    description: "Konzervativní odhad vývoje počítající s nepříznivými tržními podmínkami, vyššími cenami vstupů (elektřina) a nižší obsazeností.",
    category: "economy"
  },
  REALISTIC: {
    label: "Realistický scénář",
    description: "Střední, nejpravděpodobnější varianta vývoje. Vychází z aktuálních průměrných tržních hodnot a stabilního, očekávaného provozu.",
    category: "economy"
  },
  OPTIMISTIC: {
    label: "Optimistický scénář",
    description: "Ideální vývoj projektu za předpokladu maximální poptávky, nízkých cen energií a stoprocentního komerčního úspěchu.",
    category: "economy"
  },
  coloc: {
    label: "Colocation",
    description: "Business model: Pronájem fyzického prostoru, chlazení a napájení pro servery...",
    category: "dc_specific"
  },
  training: {
    label: "AI Training",
    description: "Business model: Pronájem masivního výpočetního výkonu (celých GPU clusterů)...",
    category: "dc_specific"
  },
  inference: {
    label: "AI Inference",
    description: "Business model: Provozování již hotových AI modelů v produkci...",
    category: "dc_specific"
  },
  categoryLabels: {
    tax_rates: "Daňové sazby",
    costs: "Nákladové parametry",
    employment: "Parametry zaměstnanosti",
    revenue: "Výnosové parametry",
    economy: "Ekonomické parametry",
    energy: "Energetické parametry",
    environment: "Environmentální parametry",
    dc_specific: "Parametry specifické pro typy DC",
    model: "Parametry modelu a scénářů",
  },
};