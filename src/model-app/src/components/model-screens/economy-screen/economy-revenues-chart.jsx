import { useMemo } from "react"
import { BarChart3 } from "lucide-react"
import { Bar, XAxis, CartesianGrid, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartCard } from "@/components/model-screens/components/chart-card"
import { StyledYAxis } from "@/components/model-screens/components/styled-yaxis"
import { SCENARIO_NAMES } from "@/constants/chart-labels"
import { toMillions } from "@/logic/utility"

// Konfigurace barev a popisků pro graf
const chartConfigRevenues = {
    gva: { label: "HPH", color: "#10b981" },
    electricity: { label: "Náklady na elektřinu", color: "#06b6d4" },
    otherOpex: { label: "Ostatní mezispotřeba", color: "#6366f1" },
}

const prepareChartData = (data) => {
    if (!data) return []
    return ["PESIMISTIC", "REALISTIC", "OPTIMISTIC"].map((scenario) => {
        const scenarioData = data[scenario]
        return {
            key: scenario,
            name: SCENARIO_NAMES[scenario] || scenario,
            gva: toMillions(scenarioData.portfolioYearlyOperationsGva),
            electricity: toMillions(scenarioData.portfolioElectricityCosts),
            otherOpex: toMillions(scenarioData.portfolioOtherOpex),
        }
    })
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
            <ChartContainer config={chartConfigRevenues} className="w-full mt-2 h-[350px] aspect-auto">
                <ComposedChart data={economyData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                    <StyledYAxis
                        tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} mil. Kč`}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="w-[110%]" unit="mil. Kč" />} />
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
