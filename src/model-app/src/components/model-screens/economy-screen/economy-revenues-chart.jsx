import { useMemo } from "react"
import { BarChart3 } from "lucide-react"
import { Bar, XAxis, CartesianGrid, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartCard } from "@/components/model-screens/components/chart-card"
import { StyledYAxis } from "@/components/model-screens/components/styled-yaxis"
import { SCENARIO_LABELS } from "@/constants/config"
import { toBillions } from "@/logic/utility"

// Konfigurace barev a popisků pro graf
const chartConfigRevenues = {
    gva: { label: "HPH", color: "#10b981" },
    electricity: { label: "Náklady na elektřinu", color: "#06b6d4" },
    otherOpex: { label: "Ostatní mezispotřeba", color: "#6366f1" },
}

const prepareChartData = (data) => {

    const chartPoints = []
    Object.entries(SCENARIO_LABELS).forEach(([key, label]) => {
        const scenarioData = data[key]
        chartPoints.push({
            key: key,
            name: label,
            gva: toBillions(scenarioData.portfolioYearlyOperationsGva),
            electricity: toBillions(scenarioData.portfolioElectricityCosts),
            otherOpex: toBillions(scenarioData.portfolioOtherOpex),
        })
    })

    return chartPoints
}

export const EconomyRevenuesChart = ({ data, chartCopy }) => {
    if (!data || !chartCopy) return null
    const economyData = useMemo(() => prepareChartData(data), [data])

    return (
        <ChartCard
            title={chartCopy.title}
            description={chartCopy.description}
            icon={<BarChart3 className="h-4 w-4" />}
            iconBgClass="bg-emerald-100/70 text-emerald-700"
            cardClass="border-emerald-100 bg-linear-to-br from-emerald-50/40 via-slate-50/20 to-cyan-50/30"
            hoverExplanation={chartCopy.hoverExplanation}
        >
            <ChartContainer config={chartConfigRevenues} className="w-full mt-2 h-87.5 aspect-auto">
                <ComposedChart data={economyData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                    <StyledYAxis
                        tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} mld. Kč`}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="w-[110%]" unit="mld. Kč" />} />
                    <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                    <Bar
                        dataKey="gva"
                        name="HPH"
                        stackId="a"
                        fill="var(--color-gva)"
                        opacity={0.55}
                        maxBarSize={50}
                        activeBar={{ opacity: 0.9, stroke: "var(--color-gva)", strokeWidth: 1 }}
                    />
                    <Bar
                        dataKey="electricity"
                        name="Náklady na elektřinu"
                        stackId="a"
                        fill="var(--color-electricity)"
                        opacity={0.55}
                        maxBarSize={50}
                        activeBar={{ opacity: 0.9, stroke: "var(--color-electricity)", strokeWidth: 1 }}
                    />
                    <Bar
                        dataKey="otherOpex"
                        name="Ostatní mezispotřeba"
                        stackId="a"
                        fill="var(--color-otherOpex)"
                        opacity={0.55}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                        activeBar={{ opacity: 0.9, stroke: "var(--color-otherOpex)", strokeWidth: 1 }}
                    />
                </ComposedChart>
            </ChartContainer>
        </ChartCard >
    )
}
