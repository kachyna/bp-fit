import { Landmark, TrendingUp, Users, Wallet } from "lucide-react"
import { ComparisonData } from "./comparisons"

export const economySources = {
    highway: ["https://www.garaz.cz/clanek/zajimavosti-kolik-stoji-jeden-kilometr-dalnice-je-to-penez-jako-zelez-ale-byvalo-i-hur-21013380"],
    hospital: ["https://www.transparency.cz/stavba-nove-krajske-nemocnice-nebo-rekonstrukce-te-stavajici-poslechnete-si-zlinskou-verejnou-debatu/"],
    gvaComparison: ["https://apl.czso.cz/pll/rocenka/rocenkavyber.socas"],
    czechInvest: ["https://www.czechinvest.org/cz/O-CzechInvestu/Statistiky-investic"],
    kindergarten: ["https://www.denik.cz/ekonomika/skoly-skolky-penize-stavba.html"],
    teacherSalary: ["https://www.czso.cz/csu/czso/struktura-mezd-zamestnancu-2025"]
}

export const getEconomyCopy = (currentData) => {
    const capex = currentData.portfolioTotalInvestment || 0
    const gvaOperations = currentData.portfolioYearlyOperationsGva || 0
    const totalTaxes = currentData.portfolioTotalPublicIncome || 0
    const propertyTax = currentData.portfolioPropertyTax || 0
    const fteOps = currentData.portfolioFteOperations || 1

    const equivalents = {
        highwayKm: (capex / 239000000).toFixed(1),
        hostpital: (capex / 8000000000).toFixed(1),
        OilGasGva: (gvaOperations * 100 / 1547000000).toFixed(2),
        PharmaFva: (gvaOperations * 100 / 29879000000).toFixed(2),
        ItGva: (gvaOperations * 100 / 298858000000).toFixed(2),
        gvaPerWorker: (gvaOperations / fteOps / 1000000).toFixed(1),
        investmentPerJob: (capex / fteOps / 1000000).toFixed(1),
        teachersCount: Math.round(totalTaxes / 800000),
        kindergartensCount: (totalTaxes / 40000000).toFixed(1)
    }

    const formattedCAPEX = `${(capex / 1000000000).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mld. Kč`
    const formattedGVA = `${(gvaOperations / 1000000000).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mld. Kč`
    const formattedTaxes = `${(totalTaxes / 1000000000).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mld. Kč`
    const formattedPropertyTax = `${(propertyTax / 1000000000).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mld. Kč`

    return {
        intro: {
            title: "Ekonomický přínos a struktura projektu",
            children: (
                <>
                    <p>
                        Pokud se má někde stavět datové centrum, jde hlavně o peníze a ekonomiku.
                        V tomto modulu můžete prozkoumat, jaké ekonomické dopady bude mít výstavba a provoz vašeho portfolia datových center na Českou republiku.
                        Model počítá pouze přímé efekty, nikoli nepřímé ani indukované.
                    </p><p>
                        Můžete si vymodelovat celé portfolio, ale vyzkoušetje také dopady jednotlivých typů datových center – možná vás překvapí, jak zásadně se jejich ekonomický dopad liší.
                        Pomocí výběru scénáře vpravo nahoře vedle nastavení můžete sledovat, jak se mění ekonomická výkonnost a přínosy v závislosti na tržních podmínkách a obsazenosti.
                    </p>
                </>
            ),
            hover: (
                <>
                    <p>
                        Obecně datová centra v ekonomice vytvoří <strong>velký impuls při výstavbě</strong>, kdy vznikne asi 500 pracovních pozic na 100 MW a do ekonomiky se dostanou miliardy Kč z výstavby – obzvláště pokud se jí zúčastní domácí firmy.
                        Pořizování samotného vybavení pak většinou probíhá ze zahraničí a přímý dopad na ČR je minimální. Clo na IT technologie je totiž v EU nulové a zaplacená DPH se provozovateli na konci účetního období vrací.
                    </p><p>
                        <strong>Ve fázi provozu</strong> pak záleží na ziscích, jaké v daném roce firma dosáhne – to je ale obtížné vymodelovat, protože záleží na účetní a odpisové politice dané firmy.
                        Ani DPH nelze přesně vymodelovat, protože firma své služby prodává především jiným podnikatelům a často i do zahraničí.
                        Jediným konečným zákazníkem AI DC jsou klienti, kteří posílají dotazy modelům umělé inteligenci a platí za to. Zde ale nastává paradox:
                    </p>
                    <ul className="list-disc list-inside space-y-1 my-2 pl-4">
                        <li>DPH za výpočetní služby se v EU platí v místě spotřeby. </li>
                        <li>Pokud se tedy uživatel z Polska rozhodne využívat AI model běžící v datovém centru v ČR, tak platí DPH do polské státní pokladny.</li>
                        <li>Opačnou logikou platí, že kdyby DC stálo v Polsku a využívali by ho Češi, přes DPH by do veřejného rozpočtu stejně peněz, jako kdyby stálo u nás.</li>
                        <li>Dopad na českou ekonomiku by byl tak či onak stejný.</li>
                    </ul>
                    <p>
                        Zůstává tedy otázkou, proč si to brát na triko? Výpočetní výkon se už dnes stává drahou komoditou, podobně jako ropa nebo zemní plyn.
                        Z politického hlediska je proto důležité, aby měl každý stát (či větší celek) vlastní zdroje, neboť závislost na jiném celku by se v budoucnu mohla stát hrozbou.
                        Konkrétně pro evropské země je pak důležitá podpora ze strany EU, která má v rámci projektu AI factory mobilizovat investice ve výši až 20 miliard eur.
                    </p><p>
                        A proč si to na triko vzaly státy v USA nebo třeba Irsko? Provozovatelé DC jim totiž slibovali, že výstavba nového datového centra v ekonomice způsobí obrovský rozkvět lukrativních IT pozic a koncentrace nových firem.
                        Realita je však jiná – samotné datové centrum má asi 50 zaměstnanců na 100 MW (podívejte se na kartu níže) a žádný lokální rozkvět nezpůsobuje, jak ukazuje například studie <a className="text-blue-400 hover:text-blue-500 cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://dx.doi.org/10.2139/ssrn.5881105">Subsidizing the Cloud: U.S. State Incentives to Data Centers</a>.
                    </p><p>
                        Přínosy datových center tak skutečně spočívají spíše ve strategické rovině než ekonomické návratnosti.
                        Při rozhodování o povolení jejich výstavby je důležité především kdo bude provozovatelem a jaké podmínky nabídne.
                        Kdo bude DC a v něm uložená data vlastnit? Bude moct stát používat výpočetní výkon a za jakých okolností?
                        Bude z výstavby těžit pouze soukromý majitel, nebo se podaří DC použít i pro vědu a výzkum?
                    </p>
                </>
            )
        },
        capex: {
            title: "Celková investice",
            color: "amber",
            icon: <Landmark className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-2xl font-bold text-amber-950 mb-2">
                        {formattedCAPEX}
                    </div>
                    <p className="text-xs text-amber-600/70 mt-2">na stavbu a IT vybavení</p>
                </>
            ),
            comparisonHeader: "Za tuto částku by bylo možné...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.highway} className="text-amber-700 hover:text-amber-900 transition-colors">
                        <p>postavit <span className="font-semibold text-amber-900">{equivalents.highwayKm} km</span> nových dálnic,</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.hospital} className="text-amber-700 hover:text-amber-900 transition-colors">
                        <p>nebo <span className="font-semibold text-amber-900">{equivalents.hostpital}</span> krajských nemocnic.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>Datová centra vyžadují masivní počáteční investice. Zatímco samotná budova, chlazení a infrastruktura stojí asi 230 milionů Kč na 1 MW příkonu, IT technologie stojí na 1 MW až 4krát víc. Zobrazená částka pokrývá celkové náklady na pořízení všech technologií a vybudování budovy.
                    </p><p>
                        Samotná výše investice nám toho z pohledu ekonomiky moc neřekne – důležité je srovnání kapitálové náročnosti projektu s ostatními ukazateli, které nám o jeho efektivitě prozradí víc (najdete je v ostatních kartách).
                    </p><p>
                        Srovnání s dálnicemi a nemocnicemi uvedené výše jsou pouze ilustrační. Investice do DC většinou pocházejí ze soukromých zdrojů. Není to tak, že místo DC by stát mohl postavit dálnici nebo nemocnici.
                    </p>
                </>
            )
        },
        gva: {
            title: "Roční HPH",
            color: "emerald",
            icon: <TrendingUp className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-2xl font-bold text-emerald-950">
                        {formattedGVA}
                    </div>
                    <p className="text-xs text-emerald-800/70 mt-2">hrubé přidané hodnoty (GVA)</p>
                </>
            ),
            comparisonHeader: "To je jako HPH sektorů...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p><span className="font-semibold text-emerald-900">{equivalents.OilGasGva} %</span> těžby ropy a plynu,</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p> <span className="font-semibold text-emerald-900">{equivalents.PharmaFva} %</span> výroby léčiv,</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p>nebo <span className="font-semibold text-emerald-900">{equivalents.ItGva} %</span> českého IT sektoru.</p>
                    </ComparisonData>

                </>

            ),
            children: (
                <>
                    <p>
                        Hrubá přidaná hodnota je čistý ekonomický přínos projektu po odečtení mezispotřeby od celkové produkce.
                        Ukazuje reálnou nově vytvořenou hodnotu v rámci ekonomiky.
                    </p><p>
                        V případě datových center jsou produkcí prodané kapacity, prodané služby nebo zpracované tokeny.
                        Mezispotřebu tvoří především elektrická energie a služby spojené s provozem IT technologií – licence software, servis, konektivita a další. Nezapočítavají se sem mzdy.
                    </p><p>
                        Zajímavé je sledovat, že podíl zaměstnanců na celkové HPH dosahuje přibližně{" "}
                        <span className="font-semibold text-emerald-900">{equivalents.gvaPerWorker} mil. Kč na zaměstnance</span> ročně.
                        To je přibližně <a className="text-blue-400 hover:text-blue-500 cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://ris3.gov.cz/monitoring/indikatory/v03-produktivita-prace-podle-sektoru-hphzamestnance">30-40krát více</a> než celorepublikový průměr, což DC řadí k vůbec nejefektivnějším odvětvím.
                    </p><p>

                    </p>
                </>
            )
        },
        fte: {
            title: "Pracovních míst (FTE)",
            color: "cyan",
            icon: <Users className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-cyan-950">
                            {currentData.portfolioFteOperations || 0} FTE
                        </span>
                        <span className="text-xs text-cyan-800/70">provoz</span>
                    </div>
                    <div className="text-xs text-cyan-800/60 mt-1">
                        + {currentData.portfolioFteConstruction || 0} FTE výstavba (dočasné)
                    </div>
                </>
            ),
            comparisonHeader: "Pro srovnání náročnosti...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.czechInvest} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p>V průměrném průmyslovém projektu zprostředkovaném agenturou CzechInvest postačuje investice zhruba 5.3 mil. Kč na vytvoření 1 pracovního místa.</p>
                    </ComparisonData>
                    <p>
                        U tohoto datového centra však jedno stálé provozní místo vyžaduje kapitálovou investici ve výši{" "}
                        <span className="font-semibold text-cyan-900">{equivalents.investmentPerJob} mil. Kč</span> – tedy více než 100× vyšší kapitálové zapojení na jednoho pracovníka.
                    </p>
                </>
            ),
            children: (
                <p>Tento graf odhaluje klíčový makroekonomický paradox datových center: jsou extrémně kapitálově náročná, ale přímo generují jen minimum stálých pracovních míst. Zatímco fáze výstavby generuje vyšší počet dočasných pozic, provoz vyžaduje úzce specializovaný tým.</p>
            )
        },
        taxes: {
            title: "Roční odvody a daně",
            color: "stone",
            icon: <Wallet className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-2xl font-bold text-stone-900">
                        {formattedTaxes}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                        přímo do veřejného rozpočtu
                    </div>
                </>
            ),
            comparisonHeader: "Za tuto roční částku by se dalo pořídit...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.teacherSalary} className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p>roční platy pro přibližně <span className="font-semibold text-stone-800">{equivalents.teachersCount} učitelů</span> základních škol v ČR (při průměrném platu 50 000 Kč/měsíc včetně odvodů zaměstnavatele),</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.kindergarten} className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p>nebo výstavba <span className="font-semibold text-stone-800">{equivalents.kindergartensCount} nových moderních mateřských škol</span> pro místní děti každé dva roky (při typické ceně cca 40 mil. Kč za novou školku).</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>Roční odvody a daně generované provozem představují stabilní přínos pro veřejné finance. Celková roční daňová povinnost z provozu projektu zahrnuje daň z příjmů, odvody, ekologická daň a daň z nemovitosti.</p>
                    <p>Samotná daň z nemovitosti ({formattedPropertyTax} ročně) navíc představuje stabilní, přímý příjem rozpočtu dané municipality, který může pokrýt například roční údržbu obecní zeleně či opravu dětských hřišť.</p>
                </>
            )
        },
        chartRevenues: {
            title: "Dekompozice tržeb (Struktura výkonnosti)",
            description: "Analýza struktury tržeb: Srovnání celkového výnosu a jeho rozdělení na přidanou hodnotu a hlavní provozní náklady napříč scénáři (mil. Kč).",
            hoverExplanation: "Tento graf ukazuje strukturu tržeb (výnosů) za provoz portfolia. Tržby se skládají z hrubé přidané hodnoty (HPH), což je čistý přínos projektu po odečtení mezispotřeby, dále z přímých nákladů na elektrickou energii a ostatních provozních nákladů (OPEX). Najetím na jednotlivé sloupce můžete srovnat hodnoty napříč pesimistickým, realistickým a optimistickým scénářem."
        },
        chartTaxes: {
            title: "Struktura odvodů a daňových přínosů (Realistický scénář)",
            description: "Složení ročních příspěvků do veřejných rozpočtů generovaných projektem v realistickém scénáři (mil. Kč).",
            hoverExplanation: "Tento koláčový graf podrobně rozebírá strukturu veřejných příjmů (daní a odvodů) generovaných projektem v realistickém scénáři. Ukazuje, jak se doplňují stabilní daň z nemovitosti (přímý příjem municipality), ekologická daň, provozní odvody za zaměstnance a jednorázové odvody z fáze výstavby."
        }
    }
}
