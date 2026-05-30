import { Landmark, TrendingUp, Users, Wallet } from "lucide-react"
import { ComparisonData } from "@/components/model-screens/components/comparisons"
import { prepareData } from "@/components/model-screens/texts/textutils"

const economySources = {
    highway: ["https://www.garaz.cz/clanek/zajimavosti-kolik-stoji-jeden-kilometr-dalnice-je-to-penez-jako-zelez-ale-byvalo-i-hur-21013380"],
    hospital: ["https://www.transparency.cz/stavba-nove-krajske-nemocnice-nebo-rekonstrukce-te-stavajici-poslechnete-si-zlinskou-verejnou-debatu/"],
    gvaComparison: ["https://apl.czso.cz/pll/rocenka/rocenkavyber.socas"],
    avgInvestmentPerJob: ["https://doi.org/10.2908/SBS_NA_SCA_R2"],
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
    highwayKm: (data.portfolioAnnualizedCapex.value / 239000000).toFixed(3),
    hospital: (data.portfolioAnnualizedCapex.value / 8000000000).toFixed(3),
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
})

export const getEconomyCopy = (inputData) => {

    const data = prepareData(inputData, economyKeys)
    const equivalents = prepareEquivalents(data)

    return {
        intro: {
            title: "Ekonomický přínos a struktura projektu",
            description: "Kolik výstavba a provoz datových center stojí, kdo ji zaplatí a komu se reálně vyplatí?",
            children: (
                <div className="space-y-2">
                    <p>
                        Pokud se má někde stavět datové centrum, jde hlavně o peníze.
                        V této sekci můžeš prozkoumat, jaké dopady bude mít výstavba a provoz tvého portfolia datových center na českou ekonomiku.
                    </p><p>
                        Můžeš si namodelovat celé portfolio, ale vyzkoušej také dopady jednotlivých typů datových center – možná tě překvapí, jak zásadně se jejich ekonomický dopad liší.
                        Pomocí výběru scénáře vpravo nahoře můžeš sledovat, jak se přínosy mění v závislosti na tržních podmínkách a obsazenosti. Model počítá pouze přímé efekty.
                    </p>
                </div>
            ),
            hover: (
                <>
                    <p>
                        Obecně datová centra v ekonomice vytvoří <strong>velký impuls při výstavbě</strong>, kdy vznikne asi 500 pracovních pozic na 100 MW a do ekonomiky se dostanou miliardy Kč – obzvláště pokud se stavby zúčastní domácí firmy.
                        Pořizování samotného IT vybavení pak většinou probíhá ze zahraničí a přímý dopad na ČR je minimální. Clo na IT technologie je totiž v EU nulové a DPH se investorovi na konci účetního období vrací.
                    </p><p>
                        <strong>Ve fázi provozu</strong> pak záleží na ziscích, kterých v daném roce firma dosáhne – ty jsou ale obtížné vymodelovat, jelikož závisí na účetní a odpisové politice firmy.
                        Ani DPH nelze přesně vymodelovat, protože firma své služby prodává především jiným podnikatelům a často i do zahraničí.
                        Jediným konečným zákazníkem klienti, kteří posílají dotazy placeným modelům umělé inteligence (placené verze ChatGPT, Gemini, Claude a další).
                        Zde ale nastává paradox:
                    </p>
                    <ul className="list-disc list-inside space-y-1 my-2 pl-4">
                        <li>DPH za výpočetní služby se v EU platí v místě spotřeby. </li>
                        <li> Pokud se tedy uživatel z Polska rozhodne využívat AI model běžící v datovém centru v ČR, platí DPH do polské státní pokladny.</li>
                        <li>Opačnou logikou platí, že kdyby DC stálo v Polsku a využívali by ho Češi, přiteklo by přes DPH do našeho veřejného rozpočtu stejně peněz, jako kdyby stálo u nás.</li>
                        <li>Dopad na českou ekonomiku by byl tak či onak stejný.</li>
                    </ul>
                    <p>
                        <strong>Proč tedy datová centra stavět?</strong> Výpočetní výkon se už dnes stává drahou komoditou, podobně jako ropa nebo zemní plyn.
                        Z politického hlediska je proto důležité, aby měl každý stát (či větší celek) vlastní zdroje, neboť závislost na jiném celku by se v budoucnu mohla stát hrozbou.
                        Konkrétně pro evropské země je pak důležitá podpora ze strany EU, která má v rámci projektu AI factory mobilizovat investice ve výši až 20 miliard eur.
                    </p><p>
                        <strong>Většina DC je však provozována soukromě. Proč je tedy ve velkém schvalují státy v USA nebo třeba Irsko?</strong> Provozovatelé DC jim totiž slibovali, že výstavba nového datového centra způsobí v ekonomice obrovský rozkvět lukrativních IT pozic a přiláká nové firmy.
                        Realita je však jiná – samotné datové centrum má asi 50 zaměstnanců na 100 MW (podívej se na kartu níže) a žádný lokální rozkvět nezpůsobuje, jak ukazuje například studie <a className="text-blue-400 hover:text-blue-500 cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://dx.doi.org/10.2139/ssrn.5881105">Subsidizing the Cloud: U.S. State Incentives to Data Centers</a>.
                    </p><p>
                        Přínosy datových center tak skutečně spočívají <strong>spíše ve strategické rovině</strong> než v ekonomické návratnosti.
                        Při rozhodování o povolení jejich výstavby je důležité především to, kdo bude provozovatelem a jaké podmínky nabídne.
                        Kdo bude DC a v něm uložená data vlastnit? Bude moci stát používat výpočetní výkon a za jakých okolností?
                        Bude z výstavby těžit pouze soukromý majitel, nebo se podaří DC využít i pro vědu a výzkum?
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
            comparisonHeader: "Za tuto částku by šlo každý rok...",
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
                        Celková investice do DHM za provoz tohoto portfolia DC je <span className="font-semibold text-amber-900">{data.portfolioTotalOperationsCapex.formatted}</span>.
                    </p>
                    <p>Datová centra vyžadují masivní počáteční investice.
                        Samotná budova, chlazení a infrastruktura stojí asi 230 milionů Kč na 1 MW příkonu, IT vybavení stojí na 1 MW až 4krát víc.
                    </p><p>
                        Srovnání s dálnicemi a nemocnicemi je ilustrační. Investice do DC většinou pocházejí ze soukromých zdrojů. Neplatí, že by stát místo DC mohl postavit dálnici nebo nemocnici.
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
                        Hrubá přidaná hodnota je ekonomický přínos projektu vyjádřený odečtením mezispotřeby od celkové produkce.
                    </p><p>
                        Produkcí jsou prodané kapacity (kolokační), prodané služby (trénovací) nebo zpracované tokeny (inferenční).
                        Mezispotřebu tvoří elektřina a služby spojené s provozem IT technologií – licence softwaru, servis, konektivita a další. Nezapočítávají se sem mzdy.
                    </p><p>
                        Zajímavé je sledovat, že hrubá přidaná hodnota na jednoho zaměstnance dosahuje přibližně{" "}
                        <span className="font-semibold text-emerald-900">{equivalents.gvaPerWorker} mil. Kč</span> ročně.
                        To je přibližně <a className="text-blue-400 hover:text-blue-500 cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://ris3.gov.cz/monitoring/indikatory/v03-produktivita-prace-podle-sektoru-hphzamestnance">30–40krát více</a> než celorepublikový průměr, což DC řadí k vůbec nejproduktivnějším odvětvím.
                    </p>
                </>
            )
        },
        fte: {
            title: "Pracovních míst (FTE)",
            color: "blue",
            icon: <Users className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-cyan-950">
                            {data.portfolioFteOperations.formatted}<sup>*</sup>
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
                        Karta o HPH ukazuje, že jsou datová centra velice efektivní a mají jedno z nejvyšších HPH na zaměstnance.
                        To je ale dvojsečná zbraň – za obrovské investice vytvoří jen málo pracovních míst, což se projeví v lokální ekonomice.
                        Pokud navíc vezmeš v úvahu problémy s určováním daní z příjmů právnických osob a DPH (jak je popsáno na úvodní kartě), celkové ekonomické přínosy datových center jsou sporné.
                    </p><p>
                        <sup>*</sup>FTE (Full Time Equivalent) přepočítává zaměstnance na plné úvazky po dobu jednoho roku.
                        Například 5 zaměstnanců na 1/2 úvazku se rovná 2,5 FTE. Jeden zaměstnanec na plný půlroční úvazek odpovídá 1/2 FTE.
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
                        <p><span className="font-semibold text-stone-800">{data.portfolioContributionsOperations.formatted}</span> z povinných odvodů</p>
                    </ComparisonData>

                    <ComparisonData className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p>a <span className="font-semibold text-stone-800">{data.portfolioIncomeTaxOperations.formatted}</span> z DPFO.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>
                        Roční odvody a daně ve fázi provozu představují stabilní přínos pro veřejné finance, ale mají neobvyklé rozdělení.
                    </p><p>
                        Zatímco u běžných odvětví (průmysl, služby) tvoří drtivou většinu odvodů státu daně navázané na živou práci (DPFO a sociální/zdravotní pojištění zaměstnanců), u datových center je tento poměr obrácený. Kvůli minimální zaměstnanosti (pouze jednotky FTE) je fiskální přínos tažen primárně <strong>majetkovými a ekologickými daněmi (daň z nemovitých věcí, poplatky za energie)</strong>, nikoliv lidskou prací.
                    </p><p>
                        Ideální by bylo do příjmu veřejného rozpočtu zahrnout také DPPO a DPH, nicméně jejich zahrnutí komplikuje modelaci (viz úvodní kartu).
                    </p>
                </>
            )
        },
        chartRevenues: {
            title: "Dekompozice tržeb (pro modelování HPH)",
            description: "Srovnání celkového výnosu a jeho rozdělení na přidanou hodnotu a hlavní provozní náklady napříč scénáři (mil. Kč).",
            hoverExplanation: `Tento graf ukazuje strukturu tržeb (produkce) za provoz portfolia.
                                 Výška celého sloupce ukazuje celkovou produkci portfolia datových center a rozkládá ji na HPH a mezispotřebu (elektřina + ostatní OPEX).
                                 Najetím na jednotlivé sloupce můžeš srovnat hodnoty napříč pesimistickým, realistickým a optimistickým scénářem.
                                 Zkus si namodelovat také jednotlivé typy datových center a porovnej, jak se liší struktura jejich nákladů.`
        },
        chartGvaTimeline: {
            title: "Kumulativní vývoj HPH v čase",
            description: "Celkový ekonomický přínos vyjádřený jako HPH vytvořená během výstavby a následného provozu (mld. Kč).",
            hoverExplanation: `Zatímco ostatní karty a grafy vyjadřují spíše momentové hodnoty vztažené k jednomu roku, tento graf ukazuje dlouhodobý pohled.
                            Oranžovou část tvoří jednorázový impuls HPH, která vzniká během let výstavby.
                            Zelenou část tvoří provozní HPH, která vzniká po celou dobu provozu.
                            Celková výška v každém bodě představuje celkovou hrubou přidanou hodnotu portfolia vytvořenou do toho bodu v čase.
                            `
        },
        contextCard: {
            title: "Jak interpretovat přidanou hodnotu (HPH)?",
            description: "Podívej se, co vlastně přidaná hodnota je a kdo z ní těží.",
            sections: [
                {
                    title: "Co HPH vyjadřuje?",
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                    text: (
                        <div className="space-y-2">
                            <p>
                                <strong>Hrubá přidaná hodnota (HPH)</strong> je standardní ekonomický ukazatel, který zachycuje nově vytvořenou hodnotu. Zjednodušeně řečeno vyjadřuje rozdíl mezi tím, kolik datové centrum utrží za své služby (produkce), a tím, co musí nakoupit od jiných firem pro zajištění chodu, jako je elektřina, licence či konektivita (mezispotřeba). Mzdy se do mezispotřeby nepočítají.
                            </p><p>
                                HPH je v podstatě balík peněz, ze kterého se následně platí mzdy zaměstnanců a související odvody, kryjí se odpisy budov i technologií a zbylá část tvoří zisk majitelů. Součet HPH všech odvětví v zemi po zohlednění nepřímých daní a dotací odpovídá hrubému domácímu produktu (HDP).
                            </p><p>
                                Pro účely našeho modelu je HPH skvělým ukazatelem, protože je <strong>robustní vůči účetním přesunům zisku a daňové optimalizaci</strong>. I když nevíme, jak přesně si nadnárodní korporace upraví daně a jaký čistý zisk v ČR formálně vykáže, HPH vyjadřuje reálnou ekonomickou hodnotu, která v tuzemsku díky datovému centru skutečně vznikne.
                            </p><p>
                                Tady je modelový příklad:
                            </p>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                <li>Pokud datové centrum pronajme racky, prodá výpočetní sílu pro AI trénování nebo zpracuje dotazy uživatelů za celkem <strong>100 mil. Kč ročně</strong> (to je celková <strong>produkce</strong> datového centra),</li>
                                <li>a spotřebuje k tomu elektrickou energii, chlazení, zaplatí softwarové licence a nakoupí internetovou konektivitu za <strong>60 mil. Kč</strong> (to tvoří <strong>mezispotřebu</strong>; mzdy ani daně v tom ještě započítané nejsou),</li>
                                <li>vygeneruje tím <strong>hrubou přidanou hodnotu (HPH) ve výši 40 mil. Kč</strong> – a právě z této sumy se následně vyplatí platy zaměstnancům (např. 10 mil. Kč), pokryjí se odpisy budov i serverů a zbytek tvoří provozní zisk majitele.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    title: "Extrémní efektivita?",
                    icon: <Users className="h-4 w-4 text-emerald-500" />,
                    text: (
                        <div className="space-y-2">
                            <p>
                                Když se podíváš na čísla, datová centra vypadají jako ekonomický zázrak.
                                V přepočtu na jednoho pracovníka totiž generují astronomickou hrubou přidanou hodnotu – zhruba <strong>{equivalents.gvaPerWorker} mil. Kč ročně</strong>.
                                To je až <a className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold" target="_blank" rel="noopener noreferrer" href="https://ris3.gov.cz/monitoring/indikatory/v03-produktivita-prace-podle-sektoru-hphzamestnance">čtyřicetkrát více</a>, než činí průměrná produktivita v České republice!
                                Jenže tato úchvatná statistika je spíše velký optický, respektive ekonomický klam.
                            </p><p>
                                Ďábel se skrývá v detailech účetnictví.
                                Hrubá přidaná hodnota v sobě povinně obsahuje i <strong>odpisy majetku</strong>.
                                A protože srdcem každého datového centra je extrémně drahé IT vybavení (grafické karty, AI akcelerátory, servery), které morálně zastará během <strong>pouhých 4 let</strong>,
                                obrovský kus celého HPH se okamžitě rozpustí právě v těchto rychlých a masivních odpisech hardwaru.
                            </p><p>
                                <strong>Tradiční odvětví</strong> běžně používají přepočet na pracovníky, protože lidská práce je tam klíčovým a nenahraditelným vstupem. Pro datová centra to ale <strong>vůbec neplatí</strong> – moderní DC běží víceméně jako autonomní stroje, které fungují prakticky bez zásahu a lidé jsou zapotřebí jen v krizových případech. Srovnávat takto produktivitu práce je proto <strong>silně zavádějící</strong>. Daleko smysluplnější a objektivnější by bylo poměřovat vytvořenou HPH na <strong>investovaný kapitál</strong>.
                            </p><p>
                                Ale co ty dovezené komponenty, ty nám nic nedají? Jak už víš z úvodní karty, servery a čipy se do ČR <strong>kompletně dovážejí ze zahraničí</strong>. Vzhledem k tomu, že clo na IT technologie je v EU nulové a zaplacenou DPH dostane provozovatel od státu zpět, z nákupu těchto technologií nemá tuzemská ekonomika <strong>vůbec nic</strong>. Skoro polovina celého vygenerovaného HPH tak sice na papíře vypadá skvěle a zvyšuje české HDP, ale pro reálný blahobyt naší země je v podstatě <strong>bezvýznamná</strong>.
                            </p>
                        </div>
                    )
                },
                {
                    title: "Co z toho plyne?",
                    icon: <Landmark className="h-4 w-4 text-indigo-500" />,
                    text: (
                        <div className="space-y-2">
                            <p>
                                Ačkoli je výsledné číslo HPH na první pohled ohromující, pro českou ekonomiku má svá velmi specifická úskalí. Je pravda, že HPH věrně ukazuje, jaká hodnota byla fyzicky <strong>vyprodukována přímo na území ČR</strong>. Jenže na rozdíl od tradičních odvětví, jako je například <strong>průmysl</strong>, nám toto číslo říká jen velmi málo o tom, kolik z těchto přínosů u nás skutečně zůstane.
                            </p>
                            <p>
                                <strong>Drtivou většinu HPH totiž pohltí odpisy</strong> extrémně drahého hardwaru (ze kterého, jak už víme, česká ekonomika nic nemá). To, co po odečtení odpisů a mezd zbude jako <strong>čistý provozní zisk</strong>, pak velmi často odtéká mateřským společnostem do zahraničí, protože provozovateli bývají nadnárodní technologičtí giganti.
                            </p>
                            <p>
                                A i kdyby byl vlastník ryze domácí subjekt, kvůli možnostem <strong>daňových optimalizací</strong> se firmy mohou placení daně z příjmů právnických osob (DPPO) velmi snadno vyhnout. Skutečný tuzemský přínos je proto dán spíše drobky ze stolu: vybranou daní z nemovitých věcí, ekologickými poplatky, platbami za distribuci elektřiny a platy té hrstky zaměstnanců. Je proto klíčové se nad tímto <strong>strukturálním rozdílem</strong> zamyslet a nenechat se oslnit zdánlivě astronomickými makroekonomickými ukazateli.
                            </p>
                        </div>
                    )
                }
            ]
        }
    }
}
