import { Landmark, TrendingUp, Users, Wallet } from "lucide-react"
import { ComparisonData } from "@/components/model-screens/components/comparisons"
import { prepareData } from "@/components/model-screens/texts/textutils"

const economySources = {
    highway: ["https://www.garaz.cz/clanek/zajimavosti-kolik-stoji-jeden-kilometr-dalnice-je-to-penez-jako-zelez-ale-byvalo-i-hur-21013380"],
    hospital: ["https://www.transparency.cz/stavba-nove-krajske-nemocnice-nebo-rekonstrukce-te-stavajici-poslechnete-si-zlinskou-verejnou-debatu/"],
    gvaComparison: ["https://apl.czso.cz/pll/rocenka/rocenkavyber.socas"],
    avgInvestmentPerJob: ["https://doi.org/10.2908/SBS_NA_SCA_R2"],
    kindergarten: ["https://www.denik.cz/ekonomika/skoly-skolky-penize-stavba.html"],
    teacherSalary: ["https://www.czso.cz/csu/czso/struktura-mezd-zamestnancu-2025"]
}

const economyKeys = [
    "portfolioAnnualizedCapex",
    "portfolioYearlyOperationsGva",
    "portfolioTotalPublicIncome",
    "portfolioTotalOperationsCapex",
    "portfolioPropertyTax",
    "portfolioEcologyTax",
    "portfolioContributionsOperations",
    "portfolioIncomeTaxOperations",
    "portfolioFteOperations",
    "portfolioFteConstruction"
]

const prepareEquivalents = (data) => ({
    highwayKm: (data.portfolioAnnualizedCapex.value / 239000000).toFixed(1),
    hospital: (data.portfolioAnnualizedCapex.value / 8000000000).toFixed(1),
    oilGasGva: (data.portfolioYearlyOperationsGva.value * 100 / 1547000000).toFixed(2),
    pharmaFva: (data.portfolioYearlyOperationsGva.value * 100 / 29879000000).toFixed(2),
    itGva: (data.portfolioYearlyOperationsGva.value * 100 / 298858000000).toFixed(2),
    gvaPerWorker: (data.portfolioYearlyOperationsGva.value / data.portfolioFteOperations.value / 1000000).toFixed(1),
    // 1 million USD creates 7 jobs. Divide 1 million by 7 and get cost per one job.
    // Take annualizedCapex and divide cost per one job to get number of potentially created jobs.
    energyJobs: Math.round(data.portfolioAnnualizedCapex.value / (20000000 / 7)),
    roadsJobs: Math.round(data.portfolioAnnualizedCapex.value / (20000000 / 5)),
    schoolsJobs: Math.round(data.portfolioAnnualizedCapex.value / (20000000 / 3)),
    waterJobs: Math.round(data.portfolioAnnualizedCapex.value / (20000000 / 5)),
    rdJobs: Math.round(data.portfolioAnnualizedCapex.value / (20000000 / 10)),
    teachersCount: Math.round(data.portfolioTotalPublicIncome.value / 800000),
    kindergartensCount: (data.portfolioTotalPublicIncome.value / 40000000).toFixed(1)
})

export const getEconomyCopy = (inputData) => {

    const data = prepareData(inputData, economyKeys)
    const equivalents = prepareEquivalents(data)

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
            title: "Roční investice",
            color: "amber",
            icon: <Landmark className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-2xl font-bold text-amber-950 mb-2">
                        {data.portfolioAnnualizedCapex.formatted}
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
                        <p>nebo <span className="font-semibold text-amber-900">{equivalents.hospital}</span> krajských nemocnic.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>
                        Zobrazená částka ukazuje celkové náklady na budovu včetně výpočetní techniky vydělené počtem let provozu datového centra (annualized CAPEX).
                        Datová centra v DHM vlastní především budovu a IT vybavení, přičemž budovy se odpisují 30 let a IT vybavení 4 roky – za životnost budovy se tak IT vybavení obmění teoreticky 7,5krát.
                        Celková investice do DHM za provoz tohoto portfolia DC je <span className="font-semibold text-amber-900">{data.portfolioTotalOperationsCapex.formatted}</span>.
                    </p>
                    <p>Datová centra vyžadují masivní počáteční investice.
                        Samotná budova, chlazení a infrastruktura stojí asi 230 milionů Kč na 1 MW příkonu, IT vybavení stojí na 1 MW až 4krát víc.
                    </p><p>
                        Výše investice jako taková nám toho moc neřekne – důležité je srovnání kapitálové náročnosti projektu s ostatními ukazateli, které nám o jeho efektivitě prozradí víc (najdete je v ostatních kartách).
                    </p><p>
                        Srovnání s dálnicemi a nemocnicemi je ilustrační. Investice do DC většinou pocházejí ze soukromých zdrojů. Není to tak, že místo DC by stát mohl postavit dálnici nebo nemocnici.
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
                        {data.portfolioYearlyOperationsGva.formatted}
                    </div>
                    <p className="text-xs text-emerald-800/70 mt-2">hrubé přidané hodnoty (GVA)</p>
                </>
            ),
            comparisonHeader: "To je jako HPH sektorů...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p><span className="font-semibold text-emerald-900">{equivalents.oilGasGva} %</span> těžby ropy a plynu,</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p> <span className="font-semibold text-emerald-900">{equivalents.pharmaFva} %</span> výroby léčiv,</p>
                    </ComparisonData>

                    <ComparisonData sources={economySources.gvaComparison} className="text-emerald-700 hover:text-emerald-900 transition-colors">
                        <p>nebo <span className="font-semibold text-emerald-900">{equivalents.itGva} %</span> českého IT sektoru.</p>
                    </ComparisonData>

                </>

            ),
            children: (
                <>
                    <p>
                        Hrubá přidaná hodnota je čistý ekonomický přínos projektu vyjádřený odečtením mezispotřeby od celkové produkce.
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
                            {data.portfolioFteOperations.formatted}
                        </span>
                        <span className="text-xs text-cyan-800/70">v provozu</span>
                    </div>
                    <div className="text-xs text-cyan-800/60 mt-1">
                        + {data.portfolioFteConstruction.formatted} výstavba (dočasné)
                    </div>
                </>
            ),
            comparisonHeader: "Stejná investice by vytvořila...",
            comparisons: (
                <>
                    <ComparisonData sources={economySources.avgInvestmentPerJob} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p><span className="font-semibold text-cyan-900">{equivalents.energyJobs} FTE</span> v energetice,</p>
                    </ComparisonData>
                    <ComparisonData sources={economySources.avgInvestmentPerJob} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p><span className="font-semibold text-cyan-900">{equivalents.roadsJobs} FTE</span> ve stavebnictví,</p>
                    </ComparisonData>
                    <ComparisonData sources={economySources.avgInvestmentPerJob} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p><span className="font-semibold text-cyan-900">{equivalents.schoolsJobs} FTE</span> ve školství,</p>
                    </ComparisonData>
                    <ComparisonData sources={economySources.avgInvestmentPerJob} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p><span className="font-semibold text-cyan-900">{equivalents.waterJobs} FTE</span> ve vodním hospodářství,</p>
                    </ComparisonData>
                    <ComparisonData sources={economySources.avgInvestmentPerJob} className="text-cyan-700 hover:text-cyan-900 transition-colors">
                        <p>nebo <span className="font-semibold text-cyan-900">{equivalents.rdJobs} FTE</span> ve výzkumu a vývoji...</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>...zatímco v případě DC roční investice ve výši <span className="font-semibold text-cyan-900">{data.portfolioAnnualizedCapex.formatted}</span> vytvoří <span className="font-semibold text-cyan-900">{data.portfolioFteOperations.value} FTE.</span></p>
                    <p>
                        Karta o HPH ukazuje, že jsou datová centra velice efektivní a mají jedno z nějvyšších HPH na zaměstnance.
                        To je ale dvojsečná zbraň – za obrovské investice vytvoří jen málo pracovních míst, což se projeví v lokální ekonomice.
                        Pokud navíc vezmeme v potaz problémy s určením daní PO a DPH (jak je popsáno v úvodní kartě), celkové ekonomické přínosy datových center jsou problematické.
                    </p><p>
                        <sup>*</sup>FTE (Full Time Equivalent) přepočítává zaměstnance na plné úvazky po dobu jednoho roku.
                        Například 5 zaměstnanců na 1/2 úvazku je rovno 2,5 FTE.
                        Stejně tak jeden zaměstnanec na plný úvazek zaměstnaný na půl roku je roven 1/2 FTE.
                        Tato metrika se používá především při výstavbě, kde se může vystřídat až několik tisíců osob, ale každá krátkodobě – FTE sčítá jejich odpracovaný čas a dělí jej počtem pracovních dnů v roce.
                    </p>
                </>
            )
        },
        taxes: {
            title: "Roční odvody a daně",
            color: "stone",
            icon: <Wallet className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-2xl font-bold text-stone-900">
                        {data.portfolioTotalPublicIncome.formatted}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                        přímo do veřejného rozpočtu
                    </div>
                </>
            ),
            comparisonHeader: "Z toho...",
            comparisons: (
                <>
                    <ComparisonData className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p><span className="font-semibold text-stone-800">{data.portfolioPropertyTax.formatted}</span> daní z nemovitosti,</p>
                    </ComparisonData>

                    <ComparisonData className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p><span className="font-semibold text-stone-800">{data.portfolioEcologyTax.formatted}</span> ekologické daně, </p>
                    </ComparisonData>

                    <ComparisonData className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p><span className="font-semibold text-stone-800">{data.portfolioContributionsOperations.formatted}</span> z povinných odvodů a</p>
                    </ComparisonData>

                    <ComparisonData className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p><span className="font-semibold text-stone-800">{data.portfolioIncomeTaxOperations.formatted}</span> z DPFO.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>Roční odvody a daně generované ve fázi provozu představují stabilní přínos pro veřejné finance, vykazují však <strong>anomální strukturální rozdělení</strong>.</p>
                    <p>Zatímco u běžných odvětví (průmysl, služby) tvoří drtivou většinu odvodů státu daně navázané na živou práci (DPFO a sociální/zdravotní pojištění zaměstnanců), u datových center je tento poměr obrácený. Kvůli minimální zaměstnanosti (pouze jednotky FTE) je fiskální přínos tažen primárně <strong>majetkovými a ekologickými daněmi (daň z nemovitých věcí, poplatky za energie)</strong>, nikoliv lidskou prací.</p>
                    <p>Ideální by bylo do příjmu veřejného rozpočtu zahrnout také DPPO a DPH, nicméně jejich zahrnutí komplikuje modelaci (vysvětleno v úvodní kartě).</p>
                </>
            )
        },
        chartRevenues: {
            title: "Dekompozice tržeb (Modelování HPH)",
            description: "Srovnání celkového výnosu a jeho rozdělení na přidanou hodnotu a hlavní provozní náklady napříč scénáři (mil. Kč).",
            hoverExplanation: `Tento graf ukazuje strukturu tržeb (výnosů) za provoz portfolia.
                                 Výška celého sloupce ukazuje celkové tržby portfolia datových center a rozkládá je na HPH a mezispotřebu (elektřina + ostatní OPEX).
                                 Najetím na jednotlivé sloupce můžete srovnat hodnoty napříč pesimistickým, realistickým a optimistickým scénářem.
                                 Zkuste si vymodelovat také jednotlivé typy datových center a porovnejte, jak se liší struktura jejich nákladů.`
        },
        chartGvaTimeline: {
            title: "Kumulativní vývoj HPH v čase",
            description: "Celkový ekonomický přínos vyjádřený jako HPH vytvořená během výstavby a následného provozu (mld. Kč).",
            hoverExplanation: `Zatímco ostatní karty a grafy vyjadřují spíše momentové hodnoty vztažené k jednomu roku, tento graf ukazuje dlouhodobý pohled.
                            Oranžovou část tvoří jednorázový impuls HPH, která vzniká během let výstavby.
                            Zelenou část tvoří roční HPH z provozu, která vzniká po celou dobu výstavby.
                            Celková délka sloupce představuje celkovou hrubou přidanou hodnotu portfolia za celou jeho živostnost, resp. do určitého zvoleného roku.
                            `
        }
    }
}
