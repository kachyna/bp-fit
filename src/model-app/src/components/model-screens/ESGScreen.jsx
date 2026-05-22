import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Droplet, Leaf, Map, AlertTriangle, HelpCircle, BarChart3 } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { ComparisonData } from "@/components/model-screens/components/comparisons"

const sources = {
  cars: ["https://www.seznamzpravy.cz/clanek/ekonomika-prumerne-emise-co2-z-novych-aut-v-cesku-loni-klesly-o-38-procenta-295896",
    "https://www.idnes.cz/auto/zpravodajstvi/tachometr-najezd-prumerna-ridic-statistika-carvertical.A240929_102408_automoto_fdv"],
  flights: ["https://co2.myclimate.org/en/portfolios?calculation_id=8626772"],
  waterPeople: ["https://www.komunalniekologie.cz/info/prumerna-spotreba-vody-v-cr-se-pohybuje-okolo-90-litru-na-osobu-a-den"],
  lipnoPercent: ["https://www.lipno.cz/lipensko/vodni-nadrz-lipno"],
  potatoes: ["https://csu.gov.cz/rychle-informace/odhady-sklizni-zari-2020"],
  houses: ["https://csu.gov.cz/rychle-informace/analyza-bytove-vystavby-v-roce-2005-31bcbzh1t6"]
}

const chartConfig = {
  it_energyTWh: { label: "Spotřeba IT (TWh)", color: "#06b6d4" },
  energyTWh: { label: "Celková spotřeba (TWh)", color: "#2563eb" },
  emissionsThousandTonnes: { label: "Emise CO₂ (tis. t)", color: "#f43f5e" },
}

const getScenarioData = (data, scenario) => {
  if (!data) return {}
  switch (scenario) {
    case "PESIMISTIC":
      return data.PESIMISTIC || {}
    case "OPTIMISTIC":
      return data.OPTIMISTIC || {}
    case "REALISTIC":
    default:
      return data.REALISTIC || {}
  }
}

export const ESGModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
  const currentData = getScenarioData(data, activeScenario)

  const equivalents = useMemo(() => {
    const emissions = currentData.portfolioEmissionsTonnesCO2
    const waterLiters = currentData.portfolioWaterConsumptionLiters
    const landUse = currentData.portfolioLandUse
    const buildingArea = currentData.portfolioBuildingArea

    return {
      cars: Math.round(emissions / (19155 * 129 / 1000000)),
      flights: Math.round(emissions / 2.4),
      waterPeople: Math.round(waterLiters / 32850),
      lipnoPercent: (waterLiters / (309000000 * 1000) * 100).toFixed(5),
      potatoesTonnes: ((landUse / 10000) * 28.82).toFixed(1),
      houses: Math.round(buildingArea / 140)
    }
  }, [currentData])

  // Data pro meziscénářový graf
  const comparisonData = useMemo(() => {
    return ["PESIMISTIC", "REALISTIC", "OPTIMISTIC"].map((scenario) => {
      const sData = getScenarioData(data, scenario)
      return {
        name: scenario === "PESIMISTIC" ? "Pesimistický" : scenario === "REALISTIC" ? "Realistický" : "Optimistický",
        emissionsThousandTonnes: Math.round(sData.portfolioEmissionsTonnesCO2) / 1000,
        energyTWh: Math.round(sData.portfolioRealEnergyConsumption / 1000) / 1000,
        it_energyTWh: Math.round(sData.portfolioRealITConsumption / 1000) / 1000,
      }
    })
  }, [data])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-4">

        {/* KARTA 1: Sociální dopady & NIMBY */}
        <ESGHoverCard
          title="NIMBY v ČR"
          color="amber"
          icon={<AlertTriangle className="h-4 w-4" />}
          hoverContent={
            <div className="space-y-2 border-t border-amber-200/50 pt-4 text-xs text-amber-700">
              <p>NIMBY (akronym pro "Not In My Back Yard") je efekt popisující odpor místních komunit vůči plánovaným projektům. V České republice je <a className="underline text-indigo-400" href="https://stemmark.cz/hlavne-nekopejte-u-meho-domu">obzvláště silný</a>, zejména v oblasti infrastukturních staveb – továren, skladů nebo dálnic.</p>
              <p>Přestože bývá tento typ odporu kritizován jako sobecký, odráží oprávněné obavy. Američané žijící v blízkosti datových center často popisují pocit neustálého bzučení a obávají se poklesu hodnoty nemovitostí.</p>
              <p>V USA datová centra způsobují také zvyšování cen energií a vody pro místní obyvatele, nicméně v ČR tento scénář zatím nehrozí.</p>
            </div>
          }
        >
          <p className="text-xs text-amber-800/80 leading-relaxed">
            Hlavní lokální rizika představují hluk z chladicích věží a vizuální smog. Projekt vyžaduje projednání s komunitou.
          </p>
        </ESGHoverCard>

        {/* Doplnit zdroje!! */}
        {/* KARTA 2: Uhlíková stopa + Ekvivalenty */}
        <ESGHoverCard
          title="Roční emise uhlíku"
          color="stone"
          icon={<Leaf className="h-4 w-4" />}
          hoverContent={
            <div className="mt-3 space-y-1.5 border-t border-stone-200 pt-2 text-xs text-stone-600">
              <h2 className="text-sm font-medium text-stone-800">To je jako...</h2>
              <ComparisonData sources={sources.cars} className="text-stone-600 hover:text-stone-800 transition-colors">
                <p>roční provoz <span className="font-semibold text-stone-800"> {equivalents.cars.toLocaleString("cs-CZ")}</span> osobních aut,</p>
              </ComparisonData>

              <ComparisonData sources={sources.flights} className="text-stone-600 hover:text-stone-800 transition-colors">
                <p><span className="font-semibold text-stone-800">{equivalents.flights.toLocaleString("cs-CZ")} </span> zpátečních letů PRG - NY.</p>
              </ComparisonData>

              <div className="space-y-2 border-t border-stone-200/50 mt-2 pt-2 text-xs text-stone-600">
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
              </div>
            </div>
          }
        >
          <div className="text-2xl font-bold text-stone-900">{Math.round(currentData.portfolioEmissionsTonnesCO2).toLocaleString("cs-CZ")} t CO₂e</div>
        </ESGHoverCard>

        {/* KARTA 3: Spotřeba vody + Hydrologické srovnání */}
        <ESGHoverCard
          title="Roční spotřeba vody"
          color="cyan"
          icon={<Droplet className="h-4 w-4" />}
          hoverContent={
            <div className="mt-3 space-y-1.5 border-t border-cyan-200/50 pt-2 text-xs text-cyan-700">
              <h2 className="text-sm font-medium text-cyan-800">To je jako...</h2>
              <ComparisonData sources={sources.waterPeople} className="text-cyan-600 hover:text-cyan-800 transition-colors">
                <p> roční spotřeba <span className="font-semibold text-cyan-900"> {equivalents.waterPeople.toLocaleString("cs-CZ")} </span> Čechů,</p>
              </ComparisonData>
              <ComparisonData sources={sources.lipnoPercent} className="text-cyan-600 hover:text-cyan-800 transition-colors">
                <p><span className="font-semibold text-cyan-900">{equivalents.lipnoPercent} % </span> objemu nádrže Lipno.</p>
              </ComparisonData>

              <div className="space-y-2 border-t border-cyan-200/50 pt-2 mt-2 text-xs text-cyan-700">
                <p>Při posuzování dopadů na vodní zdroje je důležité rozlišovat mezi dvěma pojmy:</p>

                <ul className="list-disc list-inside">
                  <li><b>Odběr vody:</b> Množství vody, které datové centrum odebírá, ale část z něj může vracet do oběhu.</li>
                  <li><b>Spotřeba vody:</b> Množství vody, které je z okolí odebráno nenávratně (např. odpařením).</li>
                </ul>

                <p>Datová centra využívají vodu pro chlazení, přičemž jejich spotřeba závisí na typu chlazení a efektivitě. Voda se často vrací zpět do přírody, ale může být znečištěná a její spotřeba může mít dopady na místní ekosystémy.</p>
                <p>Obzvláště v České republice, která dlouhodobě trpí nedostatkem vody, je téma vysoké spotřeby vody citlivé. V porovnání s jinými průmyslovými odvětvími je však spotřeba vody datových center relativně nízká.</p>
              </div>
            </div>
          }
        >
          <div className="text-2xl font-bold text-cyan-950">
            {Math.round(currentData.portfolioWaterConsumptionLiters / 1000).toLocaleString("cs-CZ")} m³
          </div>
        </ESGHoverCard>

        {/* KARTA 4: Zábor půdy vs. Zemědělský/Sídlenkový ekvivalent */}
        <ESGHoverCard
          title="Prostorová náročnost"
          color="emerald"
          icon={<Map className="h-4 w-4" />}
          hoverContent={
            <div className="mt-2 space-y-1.5 border-t border-emerald-200/50 pt-2 text-xs text-emerald-700">
              <h2 className="text-sm font-medium text-emerald-800">Pozemky se mohly použít na...</h2>
              <ComparisonData sources={sources.potatoes} className="text-emerald-600 hover:text-emerald-800 transition-colors">
                <p> roční produkci <span className="font-semibold text-emerald-900"> {equivalents.potatoesTonnes} tun </span> brambor,</p>
              </ComparisonData>
              <ComparisonData sources={sources.houses} className="text-emerald-600 hover:text-emerald-800 transition-colors">
                <p> postavení <span className="font-semibold text-emerald-900"> {equivalents.houses} </span> rodinných domů.</p>
              </ComparisonData>

              <div className="space-y-2 border-t border-emerald-200/50 pt-4 text-xs text-emerald-700">
                <p>Ačkoliv datová centra vyžadují velký pozemek, většina z něj je využita pro budovu samotnou a její infrastrukturu. V porovnání s jinými průmyslovými odvětvími je tak spotřeba pozemků datovými centry relativně nízká.</p>

              </div>
            </div>
          }
        >
          <div className="text-sm font-medium text-emerald-950">
            Pozemek: {currentData.portfolioLandUse.toLocaleString("cs-CZ")} m²
          </div>
          <div className="text-xs text-emerald-800/70 mb-2">
            Z toho budova: {Math.round(currentData.portfolioBuildingArea).toLocaleString("cs-CZ")} m²
          </div>
        </ESGHoverCard>

      </div>

      {/* PRAVÝ SLOUPEC: Informační panel a graf scénářů */}
      <div className="lg:col-span-3 flex flex-col gap-6">

        {/* KARTA s úvodním kontextem */}
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-slate-50/30 to-indigo-50/30 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-md">
                <HelpCircle className="h-4 w-4" />
              </div>
              ESG v kontextu datových center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
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
          </CardContent>
        </Card>

        {/* Graf scénářů */}
        <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200/80">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100/70 text-indigo-700 rounded-md">
                <BarChart3 className="h-4 w-4" />
              </div>
              Meziscénářové srovnání spotřeby a emisí
            </CardTitle>
            <CardDescription className="text-slate-500 pl-9">
              Analýza chování portfolia: Sledujte, jak např. v optimistickém scénáři mění efektivnější chlazení (PUE) a nasazení lepších technologií absolutní emisní stopu navzdory růstu.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="w-full mt-2 h-[350px]">
              <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={comparisonData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />

                    {/* Levá osa: Energie v MWh */}
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} TWh`}
                      width={100}
                    />

                    {/* Pravá osa: Emise v tunách */}
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} tis. t`}
                      width={100}
                    />

                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                    <Bar
                      yAxisId="left"
                      dataKey="it_energyTWh"
                      name="Spotřeba IT vybavení (TWh)"
                      fill="var(--color-it_energyTWh)"
                      opacity={0.4}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                      activeBar={{ opacity: 0.85, stroke: "var(--color-it_energyTWh)", strokeWidth: 1 }}
                    />

                    <Bar
                      yAxisId="left"
                      dataKey="energyTWh"
                      name="Celková roční spotřeba (TWh)"
                      fill="var(--color-energyTWh)"
                      opacity={0.4}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                      activeBar={{ opacity: 0.85, stroke: "var(--color-energyTWh)", strokeWidth: 1 }}
                    />

                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="emissionsThousandTonnes"
                      name="Roční emise CO₂ (tis. t)"
                      stroke="var(--color-emissionsThousandTonnes)"
                      strokeWidth={2.5}
                      opacity={0.8}
                      dot={{ r: 4, strokeWidth: 1.5, stroke: "var(--color-emissionsThousandTonnes)", fill: "#fff" }}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff", fill: "var(--color-emissionsThousandTonnes)" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div >
  )
}