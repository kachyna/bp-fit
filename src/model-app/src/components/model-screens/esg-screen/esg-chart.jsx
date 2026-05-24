import { useMemo } from "react"
import { BarChart3 } from "lucide-react"
import { Bar, XAxis, CartesianGrid, ComposedChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartCard } from "@/components/model-screens/components/chart-card"
import { StyledYAxis } from "@/components/model-screens/components/styled-yaxis"
import { SCENARIO_NAMES } from "@/constants/chart-labels"
import { toThousands, toMillions } from "@/logic/utility"

const chartConfig = {
  it_energyTWh: { label: "Spotřeba IT (TWh)", color: "#06b6d4" },
  energyTWh: { label: "Celková spotřeba (TWh)", color: "#2563eb" },
  emissionsThousandTonnes: { label: "Emise CO₂ (tis. t)", color: "#f43f5e" },
}

const prepareChartData = (data) => {
  return ["PESIMISTIC", "REALISTIC", "OPTIMISTIC"].map((scenario) => {
    const scenarioData = data[scenario]
    return {
      name: SCENARIO_NAMES[scenario] || scenario,
      emissionsThousandTonnes: toThousands(scenarioData.portfolioEmissionsTonnesCO2, 2),
      energyTWh: toMillions(scenarioData.portfolioRealEnergyConsumption, 2),
      it_energyTWh: toMillions(scenarioData.portfolioRealITConsumption, 2),
    }
  })
}

export const ESGChart = ({ data, chartCopy }) => {
  if (!data || !chartCopy) return null;
  const esgData = useMemo(() => prepareChartData(data), [data])

  return (
    <ChartCard
      title={chartCopy.title}
      description={chartCopy.description}
      icon={<BarChart3 className="h-4 w-4" />}
      iconBgClass="bg-indigo-100/70 text-indigo-700"
      cardClass="border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30"
      hoverExplanation={chartCopy.hoverExplanation}
    >
      <ChartContainer config={chartConfig} className="w-full aspect-auto h-[350px] mt-2">
        <ComposedChart data={esgData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />

          {/* Left axis: Energy in TWh */}
          <StyledYAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} TWh`}
          />

          {/* Right axis: CO2 emissions in thousands of tons */}
          <StyledYAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} tis. t`}
          />

          <ChartTooltip content={<ChartTooltipContent className="w-[110%]" />} />
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
            name="Celková spotřeba (TWh)"
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
      </ChartContainer>
    </ChartCard>
  )
}
