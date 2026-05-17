/*
This file contains the definitions of all parameters used in the model, including their labels and descriptions.
This allows to have a single source of truth for all parameter metadata, which can be used across the application for displaying tooltips, labels, and documentation.
*/

export const PARAM_DETAILS = {
  taxIncomeRate: {
    label: "Sazba daně z příjmu FO",
    description: "Zákonná sazba daně z příjmů právnických osob používaná pro výpočet čistého zisku po zdanění."
  },
  yearlyTaxDiscount: {
    label: "Roční sleva na dani (Kč)",
    description: "Základní roční sleva na dani na poplatníka nebo jiné uplatnitelné legislativní úlevy."
  },
  contributionsEmployerRate: {
    label: "Odvody zaměstnavatele",
    description: "Procento z hrubé mzdy, které zaměstnavatel povinně odvádí na sociální a zdravotní pojištění za své zaměstnance."
  },
  contributionsEmployeeRate: {
    label: "Odvody zaměstnance",
    description: "Procento z hrubé mzdy, které se zaměstnanci automaticky strhává na sociální a zdravotní pojištění."
  },
  taxEcologyMWhRate: {
    label: "Ekologická daň (Kč/MWh)",
    description: "Zákonná daň z elektřiny v ČR uvalená na každou spotřebovanou megawatthodinu."
  },
  taxBuildingM2Rate: {
    label: "Daň ze staveb (Kč/m²)",
    description: "Základní roční sazba daně z nemovitých věcí za každý metr čtvereční zastavěné plochy budovy."
  },
  taxLandM2Rate: {
    label: "Daň z pozemků (Kč/m²)",
    description: "Základní roční sazba daně z nemovitých věcí za každý metr čtvereční celkové plochy pozemku."
  },
  kLocation: {
    label: "Koeficient lokality",
    description: "Místní koeficient určený konkrétní obcí a její velikostí, kterým se násobí základní sazba daně z nemovitostí. Jedná se o násobek místního koeficientu a koeficientu velikosti obce."
  },
  trainingGpuCountPerMW: {
    label: "Počet GPU na 1 MW (Training)",
    description: "Odhadovaný počet instalovaných AI akcelerátorů (grafických karet) připadajících na 1 megawatt IT výkonu v trénovacím scénáři."
  },
  scenarioProbabilities: {
    label: "Pravděpodobnosti scénářů",
    description: "Váhy jednotlivých scénářů pro výpočet celkového očekávaného výsledku modelu. Součet musí být 100 %."
  },

  // --- PARAMETRY SCÉNÁŘŮ ---
  // Investice a výstavba
  costBuildingPerMW: {
    label: "Výstavba budovy (Kč/MW)",
    description: "Kapitálové náklady (CAPEX) na stavební část, chlazení, napájení a záložní zdroje přepočtené na 1 MW IT výkonu."
  },
  fteBuildingPerMW: {
    label: "Pracovníci na výstavbu / MW",
    description: "Počet plných pracovních úvazků (FTE) potřebných na realizaci stavby na každý 1 MW kapacity."
  },
  wageConstruction: {
    label: "Roční mzda ve výstavbě (Kč)",
    description: "Průměrná hrubá roční mzda jednoho pracovníka ve stavební a realizační fázi projektu."
  },
  durationConstructionYrs: {
    label: "Doba výstavby (roky)",
    description: "Odhadovaný čas od zahájení stavebních prací po finální kolaudaci a spuštění provozu."
  },
  
  // Provoz
  durationOperationsYrs: {
    label: "Doba provozu datacentra (roky)",
    description: "Plánovaná ekonomická životnost projektu, po kterou se předpokládá generování výnosů."
  },
  fteOperationsPerMW: {
    label: "Pracovníci na provoz / MW",
    description: "Počet stálých zaměstnanců (FTE) zajišťujících nepřetržitý chod, údržbu a bezpečnost na 1 MW IT výkonu."
  },
  wageOperations: {
    label: "Roční mzda v provozu (Kč)",
    description: "Průměrná roční hrubá mzda technických a provozních zaměstnanců datacentra."
  },
  priceElectricityMWh: {
    label: "Cena silové elektřiny (Kč/MWh)",
    description: "Tržní nebo dlouhodobě fixovaná cena za samotnou silovou elektřinu (bez distribučních poplatků)."
  },
  opexPercentOfTotal: {
    label: "Roční OPEX (% z investice)",
    description: "Provozní náklady na údržbu, opravy, pojištění a správu technologií, vyjádřené jako procento z celkového CAPEX."
  },
  
  // Enviro a pozemky
  emissionFactorTonnesMWh: {
    label: "Emisní faktor (t CO₂/MWh)",
    description: "Množství vyprodukovaného oxidu uhličitého na každou spotřebovanou MWh z elektrické sítě (odráží čistotu energetického mixu)."
  },
  waterConsumptionLitersMWh: {
    label: "Spotřeba vody (litry/MWh)",
    description: "Objem vody spotřebovaný na chlazení technologií (odpařováním) připadající na každou MWh IT zátěže."
  },
  areaLandPerMW: {
    label: "Plocha pozemku (m²/MW)",
    description: "Celková výměra pozemku nutná pro samotnou budovu a veškeré technologické zázemí na 1 MW výkonu."
  },
  ratioBuildingLand: {
    label: "Poměr plochy budovy k pozemku",
    description: "Koeficient zastavěnosti udávající, jak velké procento z celkového pozemku tvoří půdorys budovy."
  },
  
  inferenceEnergyPerMillionTokensWh: {
    label: "Spotřeba na 1 mil. tokenů (Wh)",
    description: "Energetická náročnost AI modelů při generování odpovědí (inference), vyjádřená ve watthodinách na milion zpracovaných tokenů."
  },
  kGvaConstruction: {
    label: "Koeficient GVA výstavby",
    description: "Multiplikátor hrubé přidané hodnoty, vyjadřující makroekonomický přínos stavební fáze pro regionální HDP."
  },

  occupancy: {
    label: "Cílová obsazenost datacentra",
    description: "Plánované procento pronajaté nebo aktivně využívané kapacity datacentra."
  },
  utilization: {
    label: "Průměrné využití (IT Load)",
    description: "Skutečné průměrné vytížení serverů a technologií vůči jejich maximálnímu deklarovanému příkonu."
  },
  costEquipmentPerMW: {
    label: "Náklady na IT vybavení (Kč/MW)",
    description: "Kapitálové náklady (CAPEX) na nákup serverů, switchů a AI akcelerátorů přepočtené na 1 MW IT výkonu."
  },
  priceService: {
    label: "Ceník služeb / Nájemné",
    description: "Jednotková prodejní cena: roční nájem za 1 MW (Coloc), roční pronájem 1 GPU (Training) nebo cena za 1 mil. tokenů (Inference)."
  },

  PESIMISTIC: { 
    label: "Pesimistický scénář", 
    description: "Konzervativní odhad vývoje počítající s nepříznivými tržními podmínkami, vyššími cenami vstupů (elektřina) a nižší obsazeností." 
  },
  REALISTIC: { 
    label: "Realistický scénář", 
    description: "Střední, nejpravděpodobnější varianta vývoje. Vychází z aktuálních průměrných tržních hodnot a stabilního, očekávaného provozu." 
  },
  OPTIMISTIC: { 
    label: "Optimistický scénář", 
    description: "Ideální vývoj projektu za předpokladu maximální poptávky, nízkých cen energií a stoprocentního komerčního úspěchu." 
  },
  coloc: { 
    label: "Colocation", 
    description: "Business model: Pronájem fyzického prostoru, chlazení a napájení pro servery, které si zákazníci dodají sami. Příjmy plynou z fixního nájmu za rezervovaný příkon (MW). Typické reálné vytížení infrastruktury (IT Load) bývá nižší a stabilní (cca 40–50 %), protože klienti si platí za rezervu, kterou málokdy vytíží na maximum." 
  },
  training: { 
    label: "AI Training", 
    description: "Business model: Pronájem masivního výpočetního výkonu (celých GPU clusterů) pro vývoj a trénování velkých AI modelů. Účtuje se fixně za pronájem GPU za časové období. Typické vytížení je extrémně vysoké (80–90 %), protože výpočet běží permanentně na plný výkon po celou dobu trénovacího cyklu, aby se drahý čas GPU využil na maximum." 
  },
  inference: { 
    label: "AI Inference", 
    description: "Business model: Provozování již hotových AI modelů v produkci (např. generování textu/obrázků pro koncové uživatele přes API). Výnosy plynou z objemu zpracovaných dat (cena za 1 milion tokenů). Vytížení hardwaru je vysoce dynamické, kopíruje aktivitu lidí na internetu během dne a noci (typický průměr je kolem 50 % s ostrými špičkami)." 
  }
};