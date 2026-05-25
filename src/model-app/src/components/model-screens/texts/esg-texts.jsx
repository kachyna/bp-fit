import { AlertTriangle, Leaf, Droplet, Map } from "lucide-react"
import { ComparisonData } from "../components/comparisons"
import { prepareData } from "./textutils"

export const esgSources = {
    cars: ["https://www.seznamzpravy.cz/clanek/ekonomika-prumerne-emise-co2-z-novych-aut-v-cesku-loni-klesly-o-38-procenta-295896",
        "https://www.idnes.cz/auto/zpravodajstvi/tachometr-najezd-prumerna-ridic-statistika-carvertical.A240929_102408_automoto_fdv"],
    flights: ["https://co2.myclimate.org/en/portfolios?calculation_id=8626772"],
    waterPeople: ["https://www.komunalniekologie.cz/info/prumerna-spotreba-vody-v-cr-se-pohybuje-okolo-90-litru-na-osobu-a-den"],
    lipnoPercent: ["https://www.lipno.cz/lipensko/vodni-nadrz-lipno"],
    potatoes: ["https://csu.gov.cz/rychle-informace/odhady-sklizni-zari-2020"],
    houses: ["https://csu.gov.cz/rychle-informace/analyza-bytove-vystavby-v-roce-2005-31bcbzh1t6"]
}

const esgKeys = [
    "portfolioEmissionsTonnesCO2",
    "portfolioWaterConsumptionLiters",
    "portfolioLandUse",
    "portfolioBuildingArea"
]

const prepareEquivalents = (data) => ({
    cars: Math.round(data.portfolioEmissionsTonnesCO2.value / (19155 * 129 / 1000000)).toLocaleString("cs-CZ"),
    flights: Math.round(data.portfolioEmissionsTonnesCO2.value / 2.4).toLocaleString("cs-CZ"),
    waterPeople: Math.round(data.portfolioWaterConsumptionLiters.value / 32850).toLocaleString("cs-CZ"),
    lipnoPercent: (data.portfolioWaterConsumptionLiters.value / (309000000 * 1000) * 100).toLocaleString("cs-CZ", { maximumFractionDigits: 3 }),
    potatoesTonnes: ((data.portfolioLandUse.value / 10000) * 28.82).toFixed(1),
    houses: Math.round(data.portfolioBuildingArea.value / 140).toLocaleString("cs-CZ")
})

export const getEsgCopy = (inputData) => {

    const data = prepareData(inputData, esgKeys)
    const equivalents = prepareEquivalents(data)

    return {
        nimby: {
            title: "NIMBY v ČR",
            color: "amber",
            icon: <AlertTriangle className="h-4 w-4" />,
            mainText: (
                <p className="text-xs text-amber-800/80 leading-relaxed">
                    Hlavní lokální rizika představují hluk z chladicích věží a vizuální smog. Projekt vyžaduje projednání s komunitou.
                </p>
            ),
            comparisons: null,
            children: (
                <>
                    <p>NIMBY (akronym pro "Not In My Back Yard") je efekt popisující odpor místních komunit vůči plánovaným projektům. V České republice je <a className="underline text-indigo-400" href="https://stemmark.cz/hlavne-nekopejte-u-meho-domu">obzvláště silný</a>, zejména v oblasti infrastukturních staveb – továren, skladů nebo dálnic.</p>
                    <p>Přestože bývá tento typ odporu kritizován jako sobecký, odráží oprávněné obavy. Američané žijící v blízkosti datových center často popisují pocit neustálého bzučení a obávají se poklesu hodnoty nemovitostí.</p>
                    <p>V USA datová centra způsobují také zvyšování cen energií a vody pro místní obyvatele, nicméně v ČR tento scénář zatím nehrozí.</p>
                </>
            )
        },
        emissions: {
            title: "Roční emise uhlíku",
            color: "stone",
            icon: <Leaf className="h-4 w-4" />,
            mainText: (
                <div className="flex justify-between text-2xl font-bold text-stone-900">
                    <span>{data.portfolioEmissionsTonnesCO2.formatted}</span>
                </div>
            ),
            comparisonHeader: "To je jako...",
            comparisons: (
                <>
                    <ComparisonData sources={esgSources.cars} className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p>roční provoz <span className="font-semibold text-stone-800"> {equivalents.cars}</span> osobních aut,</p>
                    </ComparisonData>
                    <ComparisonData sources={esgSources.flights} className="text-stone-600 hover:text-stone-800 transition-colors">
                        <p><span className="font-semibold text-stone-800">{equivalents.flights} </span> zpátečních letů PRG - NY.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>Datová centra mívají záložní dieselové generátory pro případ výpadku proudu, ale při běžném provozu je nepoužívají.</p>
                    <p>Sama tak v podstatě žádný uhlík do ovzduší nevypouští.</p>
                    <p>V modelu měříme Scope II emise, které zahrnují také emise spojené s výrobou elektřiny.</p>
                    <p>Ty závisí na energetickém mixu, který se může výrazně lišit v závislosti na lokaci datového centra.</p>
                    <p> Průměrný emisní faktor byl v ČR <a
                        className="underline text-indigo-400"
                        href="https://mpo.gov.cz/assets/cz/energetika/statistika/elektrina-a-teplo/2026/4/Metodika-emisni-faktor-CO2_elektrina_2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer">pro rok 2025</a> vyčíslen na 0,33 tun CO2 na MWh (hodnota pro realistický scénář).
                    </p>
                </>
            )
        },
        water: {
            title: "Roční spotřeba vody",
            color: "cyan",
            icon: <Droplet className="h-4 w-4" />,
            mainText: (
                <div className="text-2xl font-bold text-cyan-950">
                    {data.portfolioWaterConsumptionLiters.formatted}
                </div>
            ),
            comparisonHeader: "To je jako...",
            comparisons: (
                <>
                    <ComparisonData sources={esgSources.waterPeople} className="text-cyan-600 hover:text-cyan-800 transition-colors">
                        <p> roční spotřeba <span className="font-semibold text-cyan-900"> {equivalents.waterPeople?.toLocaleString("cs-CZ")} </span> Čechů,</p>
                    </ComparisonData>
                    <ComparisonData sources={esgSources.lipnoPercent} className="text-cyan-600 hover:text-cyan-800 transition-colors">
                        <p><span className="font-semibold text-cyan-900">{equivalents.lipnoPercent} % </span> objemu nádrže Lipno.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <>
                    <p>Při posuzování dopadů na vodní zdroje je důležité rozlišovat mezi dvěma pojmy:</p>

                    <ul className="list-disc list-inside">
                        <li><b>Odběr vody:</b> Množství vody, které datové centrum odebírá, ale část z něj může vracet do oběhu.</li>
                        <li><b>Spotřeba vody:</b> Množství vody, které je z okolí odebráno nenávratně (např. odpařením).</li>
                    </ul>

                    <p>Datová centra využívají vodu pro chlazení, přičemž jejich spotřeba závisí na typu chlazení a efektivitě. Voda se často vrací zpět do přírody, ale může být znečištěná a její spotřeba může mít dopady na místní ekosystémy.</p>
                    <p>Obzvláště v České republice, která dlouhodobě trpí nedostatkem vody, je téma vysoké spotřeby vody citlivé. V porovnání s jinými průmyslovými odvětvími je však spotřeba vody datových center relativně nízká.</p>
                </>
            )
        },
        land: {
            title: "Prostorová náročnost",
            color: "emerald",
            icon: <Map className="h-4 w-4" />,
            mainText: (
                <>
                    <div className="text-sm font-medium text-emerald-950">
                        Pozemek: {data.portfolioLandUse.formatted}
                    </div>
                    <div className="text-xs text-emerald-800/70 mb-2">
                        Z toho budova: {data.portfolioBuildingArea.formatted}
                    </div>
                </>
            ),
            comparisonHeader: "Pozemky se mohly použít na...",
            comparisons: (
                <>
                    <ComparisonData sources={esgSources.potatoes} className="text-emerald-600 hover:text-emerald-800 transition-colors">
                        <p> roční produkci <span className="font-semibold text-emerald-900"> {equivalents.potatoesTonnes} tun </span> brambor,</p>
                    </ComparisonData>
                    <ComparisonData sources={esgSources.houses} className="text-emerald-600 hover:text-emerald-800 transition-colors">
                        <p> postavení <span className="font-semibold text-emerald-900"> {equivalents.houses} </span> rodinných domů.</p>
                    </ComparisonData>
                </>
            ),
            children: (
                <p>Ačkoliv datová centra vyžadují velký pozemek, většina z něj je využita pro budovu samotnou a její infrastrukturu. V porovnání s jinými průmyslovými odvětvími je tak spotřeba pozemků datovými centry relativně nízká.</p>
            )
        },
        intro: {
            title: "ESG v kontextu datových center",
            children: (
                <>
                    <p>
                        Datová centra, speciálně ta pro trénování modelů umělé inteligence, jsou extrémně náročná na spotřebu elektrické energie a vody pro chlazení.
                        Z pohledu <strong className="text-emerald-700 font-bold">E</strong>nvironmental je zásadní volba lokality, energetický mix a maximalizace účinnosti (PUE).
                        <strong className="text-amber-700 font-bold"> S</strong>ociální pilíř zohledňuje dopady na komunitu (hluk, teplo, zábor půdy a NIMBY efekt).
                        Role vlády a místních samospráv (<strong className="text-indigo-700 font-bold">G</strong>overnment) pak propojuje potřeby byznysu se zájmy společnosti.
                    </p>
                    <p>
                        V této sekci máte příležitost vymodelovat environmentální dopady jak celého portfolia datových center, tak jednotlivých budov – environmentální dopady totiž bývají silně lokalizované.
                        Namísto gigawattového komplexu zkuste v levé části stránky zadat jedno datové centrum a experimentujte s jeho typem a PUE. Jak se mění jednotlivé ukazatele?
                    </p>
                </>
            )
        },
        chart: {
            title: "Meziscénářové srovnání spotřeby a emisí",
            description: "Sledujte, jak jednotlivé parametry v různých scénářích ovlivňují IT výkon, celkový výkon a emise skleníkových plynů. Nejzajímavější je ukazatel PUE, který přímo ovlivňuje celkovou spotřebu elektřiny a tím pádem i uhlíkové emise.",
            hoverExplanation: "Proč křivka emisí oxidu uhličitého klesá i přesto, že se spotřeba zvyšuje? V optimistickém scénáří model počítá s tím, že provozovatel datového centra bude alespoň zčásti využívat obnovitelné zdroje energie. V Americe je dnes běžné, že DC má vlastní solární nebo větrné elektrárny, které mu pomáhají snížit emise. Emisní faktor můžete změnit v levém menu v Konfiguraci parametrů -> Environmentální parametry -> Emisní faktor. Zkuste jej například nastavit pro každý scénář stejně (tzn. DC používá pouze průměrnou energii ze sítě) a uvidíte přímou korelaci se spotřebou."
        }
    }
}