import { Zap, Activity, Info, Wallet } from "lucide-react"
import { ComparisonData } from "../components/comparisons"
import { prepareData } from "./textutils"

const electricitySources = {
    czCapacity: ["https://www.mordorintelligence.com/industry-reports/czechia-data-center-market"],
    irelandCapacity: ["https://www.mordorintelligence.com/industry-reports/ireland-data-center-market"],
    usaCapacity: ["https://www.goldmansachs.com/insights/articles/us-data-center-power-demand-projected-to-double-by-2027"],
    regions: ["https://www.envirometr.cz/data/spotreba-elektriny-v-krajich-dle-sektoru"],
    czConsumption: ["https://eru.gov.cz/zpravy-o-provozu"],
    householdCosumption: ["https://www.cez.cz/cs/clanky/elektrina/jaka-je-prumerna-spotreba-elektriny-u-rodinneho-domu-174046"]
}

const formatMwhToTwh = (mwh, fixed = 3) => {
    return `${(mwh / 10 ** 6).toLocaleString("cs-CZ", { minimumFractionDigits: fixed, maximumFractionDigits: fixed })} TWh`
}

const electricityKeys = [
    "portfolioTotalPower",
    "portfolioRealEnergyConsumption",
    "portfolioMaxEnergyConsumption",
    "portfolioRealITConsumption",
    "portfolioMaxITConsumption",
    "portfolioElectricityCosts"
]

const prepareEquivalents = (data) => {
    const totalPowerVal = data.portfolioTotalPower.value
    const realEnergyVal = data.portfolioRealEnergyConsumption.value
    const realItVal = data.portfolioRealITConsumption.value
    const czCapacity = 150
    const temelinCapacity = 2000
    const czConsumption = 67200000
    const czProduction = 73900000


    return {
        czCapacity: czCapacity,
        czConsumption: czConsumption,
        czProduction: czProduction,
        pctOfCzPower: (totalPowerVal / czCapacity * 100).toFixed(1),
        temelinCapacity: temelinCapacity,
        pctOfTemelinCapacity: (totalPowerVal / temelinCapacity * 100).toFixed(2),
        derivedPue: realItVal > 0 ? (realEnergyVal / realItVal).toFixed(2) : "1.50",
        pctOfPragueConsumption: (realEnergyVal / 6000000 * 100).toFixed(2),
        pctOfKarlovarskyConsumption: (realEnergyVal / 1500000 * 100).toFixed(2),
        pctOfJihomoravskyConsumption: (realEnergyVal / 5200000 * 100).toFixed(2),
        pctOfCzConsumption: (realEnergyVal / czConsumption * 100).toFixed(2),
        pctOfCzProduction: (realEnergyVal / czProduction * 100).toFixed(3),
        pctOfCzExport: (realEnergyVal / (czProduction - czConsumption) * 100).toFixed(1),
        householdsCount: Math.round(realEnergyVal / 3.5).toLocaleString("cs-CZ"),
    }
}

export const getElectricityCopy = (inputData) => {
    const data = prepareData(inputData, electricityKeys);

    ["portfolioRealEnergyConsumption", "portfolioMaxEnergyConsumption",
        "portfolioRealITConsumption", "portfolioMaxITConsumption"
    ].forEach(key => {
        data[key] = {
            ...data[key],
            "formattedTwh": formatMwhToTwh(data[key].value)
        }
    })

    const equivalents = prepareEquivalents(data)

    return {
        intro: {
            title: "Energetická náročnost datových center",
            description: "Jak moc nová datová centra zatíží českou elektrizační soustavu a proč by nás to mělo zajímat?",
            children: (
                <p>
                    Provoz datových center je extrémně energeticky náročný. Jen základní projekt o kapacitě 10 MW spotřebuje za rok stejně energie jako středně velké město.
                    U velkých projektů může odběr dosahovat až stovek megawattů, což klade obrovské nároky na přenosové sítě a energetickou infrastrukturu státu.
                </p>

            ),
            hover: (
                <>
                    <p>
                        Zásadní roli zde však hraje <strong>typ datového centra</strong>. Centra zaměřená na <strong>AI trénování (AI Training)</strong> mají kvůli vysoké hustotě GPU a jejich permanentnímu zatížení až <strong>dvakrát vyšší spotřebu</strong> než běžná pronajímaná centra (Colocation) o stejné kapacitě.
                    </p><p>
                        V této sekci můžete prozkoumat dopady zadaného portfolia na energetickou síť a zjistit, jak vaše datová centra ovlivňují celkovou spotřebu a zda mohou v ČR bezpečně fungovat.
                        V portfoliu si vyzkoušejte namodelovat jak se liší spotřeba jednoho datového centra podle jeho typu – rozdíly jsou obrovské.
                    </p>
                </>
            )
        },
        installedPower: {
            title: "Celkový příkon",
            color: "rose",
            icon: <Zap className="h-4 w-4" />,
            mainText: (
                <div className="text-2xl font-bold text-rose-950">
                    {data.portfolioTotalPower.formatted}
                </div>
            ),
            comparisonHeader: "Srovnání kapacit...",
            comparisons: (
                <>
                    <ComparisonData sources={electricitySources.czCapacity} className="text-rose-700 hover:text-rose-900 transition-colors">
                        <p>ČR má momentálně <span className="font-semibold text-rose-900">{equivalents.czCapacity} MW</span> kapacit,</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.czCapacity} className="text-rose-700 hover:text-rose-900 transition-colors">
                        <p>takže by došlo k navýšení o <span className="font-semibold text-rose-900">{equivalents.pctOfCzPower} %</span>.</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.irelandCapacity} className="text-rose-700 hover:text-rose-900 transition-colors">
                        <p>Irsko má ale <span className="font-semibold text-rose-900">2 880 MW</span> kapacit.</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.irelandCapacity} className="text-rose-700 hover:text-rose-900 transition-colors">
                        <p>a USA dokonce <span className="font-semibold text-rose-900">40 000 MW</span>...</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>
                        ... Česká republika je tedy oproti rozvinutým trhům teprve v počátcích.
                    </p>
                    <p>
                        Celkový příkon představuje maximální rezervovaný výkon, který musí mít datové centrum k dispozici ze sítě.
                        Tato energie je využívaná jak na samotný výpočetní výkon, tak chlazení, infrastrukuturu a celkový provoz datového centra.
                    </p><p>
                        Zajímavé je také srovnání s výrobou energie – například jaderná elektrárna Temelín má instalovaný výkon přibližně {equivalents.temelinCapacity} MW.
                        Zadané portfolio by tak vyžadovalo <span className="font-semibold text-rose-900">{equivalents.pctOfTemelinCapacity} %</span> instalovaného výkonu Temelína.
                    </p>
                </>
            )
        },
        realConsumption: {
            title: "Pravděpodobná spotřeba",
            color: "stone",
            icon: <Activity className="h-4 w-4" />,
            mainText: (
                <div className="text-2xl font-bold text-stone-950">
                    {data.portfolioRealEnergyConsumption.formattedTwh}
                </div>
            ),
            comparisonHeader: "Reálný provoz vs. maximum...",
            comparisons: (
                <>
                    <ComparisonData className="text-stone-600 hover:text-stone-850 transition-colors">
                        <p>z toho IT odběr je <span className="font-semibold text-stone-800">{data.portfolioRealITConsumption.formattedTwh},</span></p>
                    </ComparisonData>
                    <ComparisonData className="text-stone-600 hover:text-stone-850 transition-colors">
                        <p>takže průměrné PUE činí <span className="font-semibold text-stone-800">{equivalents.derivedPue}</span>.</p>
                    </ComparisonData>
                    <ComparisonData className="text-stone-600 hover:text-stone-850 transition-colors">
                        <p>Teoretické maximum je <span className="font-semibold text-stone-800">{data.portfolioMaxEnergyConsumption.formattedTwh}</span>.</p>
                    </ComparisonData>


                </>
            ),
            children: (
                <>
                    <p>
                        Servery v datovém centru neběží nepřetržitě na 100 % své kapacity. Spotřeba kolísá v závislosti na proměnlivé poptávce uživatelů a výpočetních prostojích.
                    </p><p>
                        Rozdíl mezi reálnou spotřebou IT hardwaru a celkovou spotřebou tvoří režie na chlazení a napájení (vyjádřená poměrem PUE). Většina energie se přemění na teplo, které je nutné odvést chladicími systémy.
                    </p><p>
                        Lepší představu o PUE a jeho dopadech na celkovou spotřebu vám mohou pomoci získat ostatní komponenty na této obrazovce, například interaktivní simulátor nebo graf Nůžky energetické efektivity.
                    </p>
                </>
            )
        },
        czComparison: {
            title: "Podíl na spotřebě ČR",
            color: "indigo",
            icon: <Info className="h-4 w-4" />,
            mainText: (
                <div className="text-2xl font-bold text-indigo-950">
                    {equivalents.pctOfCzConsumption} %
                </div>
            ),
            comparisonHeader: "To je jako spotřeba...",
            comparisons: (
                <>
                    <ComparisonData sources={electricitySources.regions} className="text-indigo-700 hover:text-indigo-900 transition-colors">
                        <p><span className="font-semibold text-indigo-900">{equivalents.pctOfKarlovarskyConsumption} %</span> Karlovarského kraje,</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.regions} className="text-indigo-700 hover:text-indigo-900 transition-colors">
                        <p><span className="font-semibold text-indigo-900">{equivalents.pctOfJihomoravskyConsumption} %</span> Jihomoravského kraje,</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.regions} className="text-indigo-700 hover:text-indigo-900 transition-colors">
                        <p><span className="font-semibold text-indigo-900">{equivalents.pctOfPragueConsumption} %</span> Prahy,</p>
                    </ComparisonData>
                    <ComparisonData sources={electricitySources.householdCosumption} className="text-indigo-700 hover:text-indigo-900 transition-colors">
                        <p>nebo <span className="font-semibold text-indigo-900">{equivalents.householdsCount}</span> domácností.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>
                        Celková roční spotřeba elektrické energie v České republice se pohybuje kolem {formatMwhToTwh(equivalents.czConsumption, 1)}, zatímco celková výroba je cca {formatMwhToTwh(equivalents.czProduction, 1)}.
                    </p>
                    <p className="mt-2">
                        Česká republika je v současnosti čistým exportérem elektřiny (vyváží cca {formatMwhToTwh(equivalents.czProduction - equivalents.czConsumption, 1)} ročně). Pokud se postaví energeticky náročná datová centra, spotřebují významnou část tohoto přebytku (přesněji <span className="font-semibold text-indigo-700">{equivalents.pctOfCzExport} % čistého exportu</span>), což by mohlo snížit exportní rezervu státu.
                    </p><p>
                        Do konce roku 2026 by se však exportní přebytek měl snížit i bez vlivu datových center, a to kvůli plánovaným odstávkám uhelných elektráren Počerady, Chvaletice a tepláren Kladno. Díky propojenosti evropského trhu s energiemi to výrazný problém nepředstavuje, protže energii lze snadno importovat. Na druhou stranu je to nutné vzít v potaz ze strategického hlediska.
                    </p><p>
                        Podíl vypočítaný v kartě nezahrnuje spotřebu nově přidaných DC – jde o podíl na momentální spotřebě ČR.
                    </p>
                </>
            )
        },
        energyCosts: {
            title: "Náklady na energie",
            color: "emerald",
            icon: <Wallet className="h-4 w-4" />,
            mainText: (
                <div className="text-2xl font-bold text-emerald-900">
                    {data.portfolioElectricityCosts.formatted}
                </div>
            ),
            comparisonHeader: "Finanční toky za energie...",
            comparisons: (null),
            children: (
                <>
                    <p>
                        Tato částka představuje klíčovou složku provozních nákladů (OPEX) datového centra. Detailnější analýzu najdete na kartě <span className="font-semibold text-emerald-700">Ekonomika</span>.
                    </p>
                    <p className="mt-2">
                        Většina těchto peněz končí u domácích dodavatelů a distributorů elektřiny, což představuje významný ekonomický přítok do české energetiky, na druhou stranu zatěžuje rozvodnou síť.
                    </p>
                </>
            )
        },
        chartGridCapacity: {
            title: "Kapacity přenosové sítě ČR",
            description: "Dokáže česká přenosová soustava uživit nová datová centra? Nastavte zatížení a pozorujte, jak se síť drží.",
            hoverExplanation: (
                <div className="space-y-2">
                    <p>
                        Zatížení sítě v ČR kolísá podle denní doby a ročního období.
                        Při vysokém zatížení čelí přenosová soustava výrazným limitům, a to i bez vlivu datových center. Nejvyšší naměřené zatížení přesahovalo 1 200 MW.
                    </p><p>
                        Maximální transformační kapacita je sice navržena na 2 500 MVA,
                        nicméně tato dodatečná kapacita slouží jako bezpečnostní záloha –
                        při výpadku jakékoli komponenty musí být připravená jiná komponenta, která je schopna převzít její zátěž.
                    </p><p>
                        V období špiček tedy bezpečná volná kapacita neexistuje, avšak při spolupráci DC se správcem přenosové soustavy by DC mohla běžet ve zbytek roku bez problémů.
                        Navíc by mohla pomoct stabilizovat energetické výkyvy, díky čemuž by se elektrárny nemusely tak často vypínat a znovu zapínat.
                        Tento model je nicméně nevyzkoušený a vyžadoval by velmi dobrou komunikaci mezi několika stranami.
                    </p>
                </div>
            )
        },
        chartScissors: {
            title: "Rozpad spotřeby portfolia",
            description: "Srovnání maximální rezervované kapacity se skutečně využívanou energií a režijními ztrátami chlazení (MWh/rok).",
            hoverExplanation: (
                <div className="space-y-2">
                    <p>
                        Proč u některých typů DC zůstává rezervovaná kapacita nenaplněna?
                    </p>
                    <ul className="list-disc ml-5">
                        <li>V případě kolokačních center záleží na tom, kolik IT kapacity si pronajmou zákazníci (Kofigurace parametrů - Výnosové parametry - Cílová obsazenost). U AI center se předpokládá, že jejich obsazenost bude maximální, protože obvykle patří jednomu majiteli, který může DC plně využívat a plánovat tak svou spotřebu. U hypescape center je to dáno tím, kolik z kapacity zarezervují sami pro sebe.</li>
                        <li>Druhou stránkou je reálné využití prodaných kapacit (Kofigurace parametrů - Energetické parametry - Průměrné využití). I kdyby zarezervovaná kapacita byla naplněna, neznamená to, že bude také plně využita.</li>
                        <li>Ze skutečně prodané a využité energie pak část putuje na chlazení a provoz DC (Režijní spotřeba) a pouze její část je efektivně využita na výpočetní výkon.</li>
                    </ul>
                    <p>
                        Doporučujeme prozkoumat jak celé vaše zadné portfolio, tak jednotlivé typy DC – jejich struktura spotřeby může být velice rozdílná.
                    </p>
                </div>
            )
        },
        pueSimulator: {
            title: "Interaktivní simulátor PUE",
            description: (
                <div className="space-y-2">
                    <p>Jaké jsou reálné dopady PUE? Pomocí slideru níže si můžete nastavit PUE a sledovat, jaký vliv to má na reálnou spotřebu datového centra.</p>
                    <p>Tato komponenta není napojená na modelovaný scénář, takže s ní můžete volně experimentovat.</p>
                </div>
            )
        },
        contextCard: {
            title: "Udržitelnost a inovace v energetice DC",
            sections: [
                {
                    title: "Využití odpadního tepla (CZT)",
                    text: "Více než 95 % elektrické energie spotřebované datovým centrem se přemění na teplo. V ČR se začíná diskutovat o připojení datových center na městské teplárenské sítě (systémy CZT). Odpadní teplo o teplotě 30–45 °C lze pomocí tepelných čerpadel dohřát a vytápět jím celé čtvrti, skleníky nebo průmyslové areály, což výrazně zvyšuje celkovou energetickou účinnost projektu. Například v severských zemích už tento model dobře funguje."
                },
                {
                    title: "Zelené PPA kontrakty",
                    text: (
                        <p>
                            Aby datová centra zbytečně nezatěžovala uhelnou či plynovou síť, provozovatelé mohou uzavřít tzv. <a className="text-blue-600 cursor-pointer" href="https://www.cezesco.cz/cs/produkty/power-purchase-agreement-ppa" target="_blank">PPA kontrakty</a> (Power Purchase Agreements) s výrobci obnovitelné energie.
                            Tím garantují dlouhodobý odběr a přímo financují výstavbu nových solárních a větrných parků, což podporuje dekarbonizaci české sítě.
                        </p>
                    )
                },
                {
                    title: "Záložní UPS jako baterie pro síť",
                    text: (
                        <>
                            <p>
                                Datová centra mají obrovská bateriová úložiště (UPS) pro překlenutí krátkodobých výpadků. Tato kapacita však může v době stability sítě sloužit jako tzv. podpůrná služba pro ČEPS. Datová centra tak mohou poskytovat flexibilitu, pomáhat vyrovnávat frekvenční výkyvy v síti a zamezit nutnosti zapínat špičkové uhelné zdroje.
                            </p>
                            <p>
                                V praxi to znamená, že datová centra mohou v době nedostatku energie dodávat energii do sítě a v době nadbytku energie ji ze sítě naopak odebírat. Tím pomáhají stabilizovat síť a snižovat náklady na provoz přenosové soustavy.
                            </p>
                        </>
                    )
                }
            ]
        }
    }
}
