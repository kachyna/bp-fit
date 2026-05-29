export const CALCULATION_DETAILS = {
    "portfolioItPower": {
        "label": "Celkový instalovaný IT výkon",
        "description": "Souhrnný maximální elektrický příkon vyhrazený čistě pro napájení výpočetní infrastruktury napříč všemi objekty v portfoliu.",
        "unit": "MW",
        "formattedUnit": "MW",
        "decimals": 1
    },
    "portfolioPue": {
        "label": "Průměrný koeficient PUE portfolia",
        "description": "Vážený průměr ukazatele energetické účinnosti (Power Usage Effectiveness) za všechna datová centra. Vyjadřuje poměr mezi celkovou spotřebou a energií dodanou IT hardwaru.",
        "unit": "bezrozměrná",
        "formattedUnit": "",
        "decimals": 2
    },
    "portfolioCount": {
        "label": "Celkový počet datových center",
        "description": "Celkový počet infrastrukturních objektů zahrnutých do hodnoceného portfolia v rámci zvoleného scénáře.",
        "unit": "ks",
        "formattedUnit": "ks",
        "decimals": 0
    },
    "portfolioTotalPower": {
        "label": "Celkový příkon celého portfolia",
        "description": "Souhrnný požadovaný elektrický příkon všech center, který zahrnuje jak napájení IT technologií, tak podpůrných systémů chlazení a záložního napájení.",
        "unit": "MW",
        "formattedUnit": "MW",
        "decimals": 1
    },
    "portfolioMaxEnergyConsumption": {
        "label": "Celková teoretická maximální spotřeba",
        "description": "Maximální sumární roční spotřeba elektrické energie všech objektů při nepřetržitém provozu na 100% projektovaný výkon po dobu 365 dní.",
        "unit": "MWh/rok",
        "formattedUnit": "mil. MWh/rok",
        "decimals": 1
    },
    "portfolioMaxITConsumption": {
        "label": "Celková teoretická maximální spotřeba IT",
        "description": "Maximální sumární roční objem elektrické energie spotřebovaný čistě výpočetním hardwarem napříč celým portfoliem při permanentním plném vytížení.",
        "unit": "MWh/rok",
        "formattedUnit": "mil. MWh/rok",
        "decimals": 1
    },
    "portfolioRealEnergyConsumption": {
        "label": "Celková reálná roční spotřeba energie",
        "description": "Odhadovaná skutečná roční spotřeba elektřiny všech center v portfoliu dohromady po započítání reálného průměrného vytížení a koeficientů PUE.",
        "unit": "MWh/rok",
        "formattedUnit": "mil. MWh/rok",
        "decimals": 1
    },
    "portfolioRealITConsumption": {
        "label": "Celková reálná roční spotřeba IT",
        "description": "Odhadovaná skutečná roční spotřeba elektrické energie spotřebovaná výhradně IT infrastrukturou napříč všemi objekty při zohlednění modelované průměrné zátěže.",
        "unit": "MWh/rok",
        "formattedUnit": "mil. MWh/rok",
        "decimals": 1
    },
    "portfolioBuildingInvestment": {
        "label": "Celkové investice do stavební infrastruktury",
        "description": "Souhrnné kapitálové náklady (CAPEX) na pořízení pozemků, výstavbou budov, chlazení a energetických přípojek pro všechna centra v portfoliu.",
        "unit": "Kč",
        "formattedUnit": "mld. Kč",
        "decimals": 2
    },
    "portfolioItEquipmentInvestment": {
        "label": "Celkové počáteční investice do IT vybavení",
        "description": "Souhrnné počáteční kapitálové výdaje na pořízení serverových sestav a síťové architektury pro celé portfolio v nultém roce projektu.",
        "unit": "Kč",
        "formattedUnit": "mil. Kč",
        "decimals": 0
    },
    "portfolioTotalInvestment": {
        "label": "Celková počáteční investice portfolia",
        "description": "Celkový souhrnný objem počátečního kapitálu (CAPEX) nezbytný pro kompletní realizaci a spuštění všech projektovaných center.",
        "unit": "Kč",
        "formattedUnit": "mld. Kč",
        "decimals": 2
    },
    "portfolioElectricityCosts": {
        "label": "Celkové roční náklady na elektřinu",
        "description": "Souhrnné provozní výdaje na nákup silové elektřiny a distribuční služby nezbytné pro zajištění reálného ročního chodu všech center v portfoliu.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč/rok",
        "decimals": 1
    },
    "portfolioOtherOpex": {
        "label": "Celkové ostatní provozní náklady",
        "description": "Pravidelné roční sumární výdaje (OPEX) za celé portfolio nezahrnující silovou elektřinu – např. správa budov, ostraha, pojištění a údržba.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč/rok",
        "decimals": 1
    },
    "portfolioIntermediateConsumption": {
        "label": "Celková roční mezispotřeba portfolia",
        "description": "Souhrn provozních nákladů (elektřina, služby, materiál), které všechna centra v portfoliu spotřebují v rámci vnitřního koloběhu pro generování svých služeb.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč/rok",
        "decimals": 1
    },
    "portfolioFteConstruction": {
        "label": "Celková zaměstnanost během výstavby",
        "description": "Sumární přepočtený počet plných pracovních úvazků (FTE) vytvořených v dodavatelských firmách po dobu trvání stavební fáze všech objektů.",
        "unit": "FTE",
        "formattedUnit": "FTE",
        "decimals": 0
    },
    "portfolioFteOperations": {
        "label": "Celková provozní zaměstnanost",
        "description": "Souhrnný počet trvalých pracovních úvazků (FTE) interních zaměstnanců zajišťujících fyzický chod, ostrahu a údržbu všech center v portfoliu.",
        "unit": "FTE",
        "formattedUnit": "FTE",
        "decimals": 0
    },
    "portfolioEmissionsTonnesCO2": {
        "label": "Celková produkce emisí CO₂",
        "description": "Odhadovaná celková roční uhlíková stopa provozu celého portfolia, kalkulovaná na základě reálné spotřeby elektřiny a aktuálního emisního faktoru energetického mixu ČR.",
        "unit": "t CO₂/rok",
        "formattedUnit": "tun CO₂",
        "decimals": 0
    },
    "portfolioWaterConsumptionLiters": {
        "label": "Celková roční spotřeba vody",
        "description": "Celkový roční objem vody spotřebovaný chladicími věžemi a pro běžný sanitární provoz napříč všemi objekty v portfoliu.",
        "unit": "l/rok",
        "formattedUnit": "mil. l",
        "decimals": 0
    },
    "portfolioLandUse": {
        "label": "Celkový zábor půdy",
        "description": "Celková sumární plošná výměra pozemků dotčených výstavbou a vnějším technologickým zázemím všech center v portfoliu.",
        "unit": "m²",
        "formattedUnit": "m²",
        "decimals": 1
    },
    "portfolioBuildingArea": {
        "label": "Celková zastavěná plocha budov",
        "description": "Souhrnná podlahová plocha všech samotných stavebních objektů (serverové sály, velíny, technické zázemí chlazení a napájení) v portfoliu.",
        "unit": "m²",
        "formattedUnit": "m²",
        "decimals": 1
    },
    "portfolioIncomeTaxConstruction": {
        "label": "Celkové DPFO z fáze výstavby",
        "description": "Jednorázový sumární daňový přínos pro veřejné rozpočty z titulu daně z příjmů fyzických osob zaměstnaných na realizaci staveb celého portfolia.",
        "unit": "Kč",
        "formattedUnit": "mil. Kč",
        "decimals": 1
    },
    "portfolioContributionsConstruction": {
        "label": "Celkové sociální a zdravotní odvody z výstavby",
        "description": "Jednorázový sumární přínos pro veřejné rozpočty z povinného pojistného placeného během stavební fáze všech objektů.",
        "unit": "Kč",
        "formattedUnit": "mil. Kč",
        "decimals": 1
    },
    "portfolioIncomeTaxOperations": {
        "label": "Celkové roční DPFO z provozu",
        "description": "Pravidelný roční sumární výnos státního rozpočtu z daně z příjmů trvalých provozních zaměstnanců napříč celým portfoliem center.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč",
        "decimals": 1
    },
    "portfolioContributionsOperations": {
        "label": "Celkové roční provozní odvody na pojištění",
        "description": "Pravidelný roční sumární přítok do systému sociálního a zdravotního zabezpečení generovaný stálými provozními pracovníky celého portfolia.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč",
        "decimals": 2
    },
    "portfolioEcologyTax": {
        "label": "Celková roční ekologická daň",
        "description": "Souhrnný pravidelný poplatek odváděný do veřejných rozpočtů za celé portfolio center, navázaný na jejich reálnou spotřebu elektřiny.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč",
        "decimals": 2
    },
    "portfolioPropertyTax": {
        "label": "Celková roční daň z nemovitých věcí",
        "description": "Souhrnný pravidelný roční příjem dotčených obcí, odvozený ze zastavěné plochy a typu průmyslových staveb všech center v portfoliu.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč",
        "decimals": 2
    },
    "portfolioYearlySales": {
        "label": "Celkové roční tržby portfolia",
        "description": "Celkový finanční objem vygenerovaný prodejem kapacit a pronájmem infrastruktury napříč všemi centry v portfoliu za jeden rok.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč/rok",
        "decimals": 0
    },
    "portfolioYearlyOperationsGva": {
        "label": "Celková roční Hrubá přidaná hodnota (provoz)",
        "description": "Sumární ekonomický přínos provozní fáze celého portfolia pro národní hospodářství (příspěvek k HDP). Počítá se jako rozdíl mezi celkovými tržbami a mezispotřebou.",
        "unit": "Kč/rok",
        "formattedUnit": "mld. Kč",
        "decimals": 3
    },
    "portfolioYearlyConstructionGva": {
        "label": "Celková Hrubá přidaná hodnota výstavby",
        "description": "Jednorázový sumární příspěvek stavební fáze všech center k tvorbě národního HDP prostřednictvím realizovaných dodávek.",
        "unit": "Kč",
        "formattedUnit": "mil. Kč",
        "decimals": 0
    },
    "portfolioTotalPublicIncome": {
        "label": "Celkový přímý fiskální přínos portfolia",
        "description": "Souhrnný roční objem finančních prostředků, které z provozu všech center plynou přímo do veřejných rozpočtů (stát, obce) skrze modelované daně a poplatky.",
        "unit": "Kč/rok",
        "formattedUnit": "mil. Kč",
        "decimals": 1
    },
    "portfolioTotalOperationsCapex": {
        "label": "Celkový kumulovaný investiční cyklus",
        "description": "Celkový souhrnný objem kapitálu investovaného v horizontu životnosti projektu za všechna centra, zohledňující nutnost pravidelné reinvestice do IT obnovy.",
        "unit": "Kč",
        "formattedUnit": "mld. Kč",
        "decimals": 2
    },
    "portfolioAnnualizedCapex": {
        "label": "Celkový anualizovaný CAPEX",
        "description": "Souhrnný průměrný roční investiční náklad celého portfolia. Rozpočítává celkové výdaje na budovy a cyklické obměny IT hardwaru na jeden rok provozu pro férové srovnání s tokovými veličinami.",
        "unit": "Kč/rok",
        "formattedUnit": "mld. Kč",
        "decimals": 3
    }
};