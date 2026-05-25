import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, XAxis, CartesianGrid, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartCard } from "@/components/model-screens/components/chart-card"
import { StyledYAxis } from "@/components/model-screens/components/styled-yaxis"
import { toThousands, toMillions } from "@/logic/utility"
import { formatData } from "@/components/model-screens/texts/textutils"
import { SCENARIO_LABELS } from "@/constants/config"

const chartConfigScissors = {
    it: { label: "Reálná IT spotřeba", color: "#3b82f6" },
    cooling: { label: "Režijní spotřeba (chlazení)", color: "#f97316" },
    reserve: { label: "Nevyužitá rezervovaná kapacita sítě", color: "#cbd5e1" }
}

const prepareScissorsData = (data) => {
    const chartPoints = []

    Object.entries(SCENARIO_LABELS).forEach(([key, label]) => {
        const scenarioData = data[key]
        if (!scenarioData) return

        const realIt = toMillions(scenarioData.portfolioRealITConsumption || 0, 3)
        const realEnergy = toMillions(scenarioData.portfolioRealEnergyConsumption || 0, 3)
        const maxE = toMillions(data.portfolioMaxEnergyConsumption || 0, 3) // read from root data level

        const realCooling = Math.max(0, Number((realEnergy - realIt).toFixed(3)))
        const reserve = Math.max(0, Number((maxE - realEnergy).toFixed(3)))

        chartPoints.push({
            name: label,
            it: realIt,
            cooling: realCooling,
            reserve: reserve
        })
    })

    return chartPoints
}

export const ElectricityScissorsChart = ({ data, chartCopy }) => {
    if (!data || !chartCopy) return null
    const scissorsData = useMemo(() => prepareScissorsData(data), [data])

    return (
        <ChartCard
            title={chartCopy.title}
            description={chartCopy.description}
            hoverExplanation={chartCopy.hoverExplanation}
            icon={<TrendingUp className="h-4 w-4" />}
            iconBgClass="bg-emerald-100/70 text-emerald-700"
            cardClass="border-emerald-100 bg-linear-to-br from-emerald-50/40 via-slate-50/20 to-cyan-50/30"
        >
            <ChartContainer config={chartConfigScissors} className="w-full mt-2 h-[280px] aspect-auto">
                <ComposedChart data={scissorsData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                    <StyledYAxis
                        tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} TWh`}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="w-[110%]" unit="TWh" />} />
                    <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                    <Bar
                        dataKey="it"
                        name="Užitečná IT spotřeba"
                        stackId="a"
                        fill="var(--color-it)"
                        opacity={0.6}
                        maxBarSize={45}
                        activeBar={{ opacity: 0.75 }}
                    />
                    <Bar
                        dataKey="cooling"
                        name="Režie chlazení"
                        stackId="a"
                        fill="var(--color-cooling)"
                        opacity={0.8}
                        maxBarSize={45}
                        activeBar={{ opacity: 0.6 }}
                    />
                    <Bar
                        dataKey="reserve"
                        name="Nevyužitá rezerva"
                        stackId="a"
                        fill="var(--color-reserve)"
                        opacity={0.5}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={45}
                        activeBar={{ opacity: 0.7 }}
                    />
                </ComposedChart>
            </ChartContainer>
        </ChartCard>
    )
}
