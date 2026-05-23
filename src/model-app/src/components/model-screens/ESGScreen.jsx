import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, BarChart3 } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { getEsgCopy } from "@/components/model-screens/components/esg-content"

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

  const esgCopy = getEsgCopy(currentData)

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

        { ['nimby', 'emissions', 'water', 'land'].map((category) => {
          return (
            <ESGHoverCard
              key={category}
              title={esgCopy[category].title}
              color={esgCopy[category].color}
              icon={esgCopy[category].icon}
              mainText={esgCopy[category].mainText}
              comparisonHeader={esgCopy[category].comparisonHeader}
              comparisons={esgCopy[category].comparisons}
            >
              {esgCopy[category].children}
            </ESGHoverCard>
          )
        })}
      </div>

      {/* PRAVÝ SLOUPEC: Informační panel a graf scénářů */}
      <div className="lg:col-span-3 flex flex-col gap-6">

        {/* KARTA s úvodním kontextem */}
        <Card className="border-emerald-100 bg-linear-to-br from-emerald-50/50 via-slate-50/30 to-indigo-50/30 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-md">
                <HelpCircle className="h-4 w-4" />
              </div>
              {esgCopy.intro.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
            {esgCopy.intro.children}
          </CardContent>
        </Card>

        {/* Graf scénářů */}
        <Card className="border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200/80">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100/70 text-indigo-700 rounded-md">
                <BarChart3 className="h-4 w-4" />
              </div>
              {esgCopy.chart.title}
            </CardTitle>
            <CardDescription className="text-slate-500 pl-9">
              {esgCopy.chart.description}
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