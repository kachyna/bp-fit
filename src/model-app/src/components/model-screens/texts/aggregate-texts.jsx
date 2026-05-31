import { BookOpen, Sliders, Layers, Cpu, Zap, Coins, Leaf, TrendingUp, Landmark, Settings } from "lucide-react"
import { prepareData } from "@/components/model-screens/texts/textutils"

const formatMwhToTwh = (mwh, fixed = 3) => {
    return `${(mwh / 10 ** 6).toLocaleString("cs-CZ", { minimumFractionDigits: fixed, maximumFractionDigits: fixed })} TWh`
}

const aggregateKeys = [
    "portfolioEmissionsTonnesCO2",
    "portfolioTotalPower",
    "portfolioRealEnergyConsumption",
    "portfolioAnnualizedCapex",
    "portfolioYearlyOperationsGva",
    "portfolioTotalPublicIncome",
]

export const getAggregateCopy = (inputData) => {
    const data = prepareData(inputData, aggregateKeys);

    return {
        header: {
            title: "Přehled portfolia",
            subtitle: "Přehled nejdůležitějších metrik tvého portfolia."
        },
        kpis: [
            {
                key: "totalPower",
                title: "Příkon datových center",
                color: "rose",
                icon: <Zap className="h-4 w-4" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-rose-950">
                            {data.portfolioTotalPower.formatted}
                        </div>
                        <p className="text-xs text-rose-600/70 mt-2">maximální rezervovaný příkon</p>
                    </>
                )
            },
            {
                key: "realConsumption",
                title: "Roční spotřeba",
                color: "amber",
                icon: <Zap className="h-4 w-4 fill-amber-500/10" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-amber-950">
                            {formatMwhToTwh(data.portfolioRealEnergyConsumption.value)}
                        </div>
                        <p className="text-xs text-amber-600/70 mt-2">pravděpodobná roční spotřeba</p>
                    </>
                )
            },
            {
                key: "investment",
                title: "Celková investice",
                color: "blue",
                icon: <Coins className="h-4 w-4" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-blue-950">
                            {data.portfolioAnnualizedCapex.formatted}
                        </div>
                        <p className="text-xs text-blue-600/70 mt-2">anualizované investiční výdaje</p>
                    </>
                )
            },
            {
                key: "gva",
                title: "Přidaná hodnota (HPH)",
                color: "indigo",
                icon: <TrendingUp className="h-4 w-4" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-indigo-950">
                            {data.portfolioYearlyOperationsGva.formatted}
                        </div>
                        <p className="text-xs text-indigo-600/70 mt-2">roční hrubá přidaná hodnota (GVA)</p>
                    </>
                )
            },
            {
                key: "publicIncome",
                title: "Veřejný rozpočet",
                color: "cyan",
                icon: <Landmark className="h-4 w-4" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-cyan-950">
                            {data.portfolioTotalPublicIncome.formatted}
                        </div>
                        <p className="text-xs text-cyan-600/70 mt-2">roční odvody do rozpočtu</p>
                    </>
                )
            },
            {
                key: "emissions",
                title: "Uhlíková stopa",
                color: "emerald",
                icon: <Leaf className="h-4 w-4" />,
                mainText: (
                    <>
                        <div className="text-2xl font-bold text-emerald-950">
                            {data.portfolioEmissionsTonnesCO2.formatted}
                        </div>
                        <p className="text-xs text-emerald-600/70 mt-2">roční emise v tunách (Scope II)</p>
                    </>
                )
            }
        ],
        about: {
            title: "O modelu",
            description: "Analýza energetické, ekonomické a environmentální stopy datových center v ČR.",
            color: "blue",
            icon: <BookOpen className="h-4 w-4" />,
            className: "lg:col-span-3",
            children: (
                <p>
                    Tento interaktivní model slouží jako nástroj pro <strong>komplexní posouzení dopadů</strong> výstavby datových center na území České republiky.
                    Umožňuje propojit technické parametry (IT příkon, PUE) s reálnými dopady na českou přenosovou soustavu, ekonomiku a životní prostředí.
                    Parametry modelu jsou založeny na datech z USA upravených pro české podmínky.
                </p>
            ),
            hoverContent: (
                <>
                    <p className="font-semibold text-slate-800">Proč tento model vznikl?</p>
                    <p>
                        V médiích je často slyšet, že se Česká republika stane AI velmocí, což nastartuje její ekonomiku a přinese spoutu pracovních míst.
                        Data ze jiných zemí však ukazují, že tento scénář by pravděpodobně nenastal.
                        Datová centra sice jsou obrovskou investicí do ekonomiky, ale jejich reálné přínosy jsou diskutabilní.
                        Nezaměstnávají mnoho lidí, hlavní část spotřeby dodávají ze zahraničí a především mají negativní dopady na své okolí.
                    </p><p>
                        Cílem tohoto modelu je ukázat, jakým způsobem by datová centra dopadla na českou společnost a jaké příležitosti by přinesla.
                        Jednotlivé metriky jsou prezentovány populárně naučnou formou, aby se s nimi mohl seznámit každý, i když nemá žádné zkušenosti z oboru.
                        Důraz je kladen spíše na vysvětlování a srovnávání než na přesná čísla, i když i ta byla velmi dobře podložená daty.
                    </p>
                    <p>
                        Metodologie výpočtů je nezávislá a plně popsaná v bakalářské práci autora tohoto modelu.
                        Obvykle se však jedná o jednoduché násobení parametrů, jejichž nastavení máš plně k dispozici – můžeš si tak vymodelovat vlastní scénáře.
                    </p>
                </>
            )
        },
        scenarios: {
            title: "Scénáře vývoje",
            description: "Modelování nejistoty pomocí tří scénářů.",
            color: "violet",
            icon: <Layers className="h-4 w-4" />,
            className: "lg:col-span-1",
            children: (
                <div className="space-y-2">
                    <p>
                        Vývoj v oblasti energetiky a IT je zatížen řadou nejistot.
                        Proto model paralelně propočítává <strong>tři scénáře</strong>,
                        které můžeš přepínat v <strong>pravém horním rohu</strong> aplikace.
                    </p>
                </div>
            ),
            hoverContent: (
                <>
                    <div className="space-y-2">
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Optimistický
                        </p>
                        <p className="pl-2.5 text-slate-500">Počítá s levnou dekarbonizovanou elektřinou a vysokým využitím datových center.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Realistický
                        </p>
                        <p className="pl-2.5 text-slate-500">Představuje nejpravděpodobnější vývoj odpovídající současným trendům v ČR a ve světě.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Pesimistický
                        </p>
                        <p className="pl-2.5 text-slate-500">Konzervativní scénář s vysokými cenami energie, vyšší uhlíkovou stopou a nižším využitím DC.</p>
                    </div>
                </>
            ),
        },
        guide: {
            title: "Jak pracovat s modelem",
            description: "Základní orientace v aplikaci a jejích funkcích.",
            color: "emerald",
            icon: <Sliders className="h-4 w-4" />,
            className: "lg:col-span-3",
            children: (
                <div className="space-y-4">
                    <p>
                        Model funguje jako <strong>interaktivní sandbox (pískoviště)</strong> – libovolně v něm můžeš nakonfigurovat portfolio datových center, upravit výpočetní konstanty a přepínat scénáře vývoje, přičemž se veškeré výsledky okamžitě přepočítávají. Ovládání je v <strong>levém bočním panelu</strong>. Doporučuju začít v tomto pořadí:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 bg-white/70 border border-slate-100 rounded-xl shadow-2xs flex gap-3 items-start hover:border-emerald-200 hover:bg-white transition-colors duration-200">
                            <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold mt-0.5">
                                1
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-slate-800">Zadání portfolia</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    V levém panelu přidej budovu, zvol její typ, požadovaný IT příkon a počet stejných objektů.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/70 border border-slate-100 rounded-xl shadow-2xs flex gap-3 items-start hover:border-emerald-200 hover:bg-white transition-colors duration-200">
                            <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold mt-0.5">
                                2
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-slate-800">Nastavení parametrů</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Pokud chceš detailnější analýzu, rozklikni spodní panel a uprav specifické konstanty modelu.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/70 border border-slate-100 rounded-xl shadow-2xs flex gap-3 items-start hover:border-emerald-200 hover:bg-white transition-colors duration-200">
                            <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold mt-0.5">
                                3
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-slate-800">Analýza výsledků</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Přepínej horní záložky (Elektřina, Ekonomika, ESG) a sleduj dopady svého portfolia v grafech.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            hoverContent: (
                <>
                    <div className="space-y-1.5">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <span className="p-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 w-5 h-5 flex items-center justify-center">1</span>
                            Tvorba a správa portfolia
                        </p>
                        <p className="pl-6">
                            V horní části levého panelu spravuješ konkrétní budovy ve svém portfoliu.
                            Tlačítkem <strong>Přidat</strong> vložíš novou budovu.
                            U každého záznamu můžeš vybrat typ centra (<strong>Kolokační</strong>, <strong>AI trénovací</strong> nebo <strong>AI inferenční</strong>), nastavit jeho <strong>IT příkon v MW</strong>, požadovaný koeficient <strong>PUE</strong> a <strong>počet</strong> takových objektů v portfoliu.
                            Budovy můžeš rozkliknout pro detailnější náhled (ikonka šipek) nebo je smazat (ikonka popelnice).
                            Pokud si nevíš rady s významem metrik, klikni na tlačítko <strong>Vysvětlení vstupních hodnot</strong>.
                        </p>
                    </div>
                    <div className="space-y-2 mt-3">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <span className="p-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 w-5 h-5 flex items-center justify-center">2</span>
                            Úprava parametrů a konstant
                        </p>
                        <p className="pl-6">
                            Ve spodní části levého panelu rozklikni záložku <strong>Konfigurace parametrů</strong>.
                            Tyto konstanty jsou přehledně rozdělené podle jednotlivých kategorií.
                            Některé hodnoty jsou stejné pro všechny scénáře, jiné je pak potřeba vyplnit třikrát (pro každý scénář zvlášť).
                            Pokud ti není jasný význam některého parametru, po najetí na otazník se objeví okno s detailnějším popisem.
                        </p>
                        <p className="pl-6 mt-1.5">
                            Změněné hodnoty se do modelu promítnou po kliknutí na tlačítko <strong>Přepočítat</strong>. Pro navrácení k výchozím hodnotám klikni na tlačítko <strong>Obnovit</strong>.
                        </p>
                    </div>
                    <div className="space-y-2 mt-3">
                        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <span className="p-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 w-5 h-5 flex items-center justify-center">3</span>
                            Sledování a interpretace výsledků
                        </p>
                        <p className="pl-6">
                            Výstupy modelu můžeš podrobně zkoumat přepínáním horních záložek:
                        </p>
                        <ul className="list-disc pl-10 space-y-1 text-slate-800">
                            <li><strong>Elektřina:</strong> Vliv na celkovou kapacitu české přenosové soustavy (srovnání s kapacitou Temelína či exportem ČR) a interaktivní simulátor zatížení sítě.</li>
                            <li><strong>Ekonomika:</strong> Vývoj investičních a provozních nákladů, tvorba hrubé přidané hodnoty (HPH/GVA) a daňový přínos pro veřejné rozpočty včetně názorných srovnání.</li>
                            <li><strong>Udržitelnost / ESG:</strong> Výpočet nepřímých emisí Scope 2, spotřeba vody (srovnání se spotřebou obyvatel či objemem Lipna) a zábor půdy.</li>
                        </ul>
                        <p>
                            Pokud by tě zajímaly jiné výpočty, než které jsou v modelu implementovány, zdrojové hodnoty můžeš zjistit po rozkliknutí Nastavení v pravém horním rohu a povolení Debug view.
                            Pak se ti zobrazí jedna dodatečná záložka, po jejímž rozkliknutí uvidíš údaje o všech datových centrech, jejich součty a celkové hodnoty.
                        </p>

                    </div>
                </>
            ),
        },
        credits: {
            title: "Technologie a knihovny",
            description: "Použité nástroje, komponenty a frameworky.",
            color: "amber",
            icon: <Cpu className="h-4 w-4" />,
            className: "lg:col-span-2",
            children: (
                <p>
                    Tento model je postaven na moderním frontendovém stacku s využitím <strong>Reactu</strong>, nástroje <strong>Vite</strong> a frameworku <strong>Tailwind CSS</strong>.
                    Využívá komponenty designové knihovny <strong><a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="underline">shadcn UI</a></strong>.
                </p>
            ),
            hoverContent: (
                <>
                    <p>
                        Model funguje jako čistě frontendová aplikace. Veškeré výpočty jsou prováděny plně na straně klienta a výchozí hodnoty parametrů jsou součástí zdrojového kódu.
                        Díky tomu je aplikace funkční i bez přístupu k internetu a nezávislá na externích serverech. Použití vícevrstvé architektury by pro tyto účely bylo zbytečným zatížením.
                    </p>
                    <p>
                        Výpočetní engine je napsán v javascriptu a je možné si jej prohlédnout ve <a href="https://github.com/kachyna/bp-fit" target="_blank" rel="noopener noreferrer" className="underline">veřejném repozitáři</a>.
                        Uživatelské rozhraní využívá předpřipravené komponenty knihovny <strong>shadcn UI</strong> a sadu ikon <strong>Lucide React</strong>.
                        Předpřipravené komponenty jsou zejména sidebar, karty, inputy, tlačítka, grafy a další.
                        Animace přepínání záložek na zajišťuje knihovna <strong>Framer Motion</strong>.

                    </p>
                    <p className="font-semibold text-slate-800">Využití AI při vývoji:</p>
                    <p>
                        Při tvorbě aplikace byly využity velké jazykové modely Gemini 3.1 Pro a Gemini 3.5 Flash. Veškerý navržený program byl <strong>důkladně revidován, upraven a plně pochopen</strong> autorem práce, který ručí za funkčnost a kvalitu kódu.
                    </p>
                </>
            )
        },
        settingsTip: {
            title: "Vadí ti hover?",
            color: "slate",
            icon: <Settings className="h-4 w-4" />,
            className: "lg:col-span-1",
            children: "V nastavení vpravo nahoře si můžeš zapnout automatickou expanzi všech karet pro pohodlné čtení. Nebo si ji vypni, pokud jsi na mobilu a nezajímají tě všechny texty."
        },
        portfolio: {
            title: "Složení portfolia",
            totalItPower: "Celkový IT výkon",
            unitItPower: "MW IT",
            emptyTitle: "Portfolio je prázdné",
            emptyDescription: "Přidej datové centrum v levém panelu pro zobrazení jeho složení.",
            footerLegend: "Proporce jsou dle celkového IT příkonu."
        }
    }
}
