import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, XAxis, CartesianGrid, ComposedChart, Line, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartCard } from "@/components/model-screens/components/chart-card"
import { StyledYAxis } from "@/components/model-screens/components/styled-yaxis"
import { useModelStore } from "@/store/useModelStore"
import { toMillions, toBillions } from "@/logic/utility"

// Konfigurace barev a popisků pro graf vývoje HPH
const chartConfigGvaTimeline = {
    constructionGva: { label: "HPH z výstavby", color: "#f59e0b" },
    operationsGva: { label: "HPH z provozu", color: "#10b981" },
    totalGva: { label: "Celková HPH", color: "#6366f1" },
}

const prepareChartData = (data, scenarioParams) => {
    if (!data) return []
    const durationConstructionYrs = scenarioParams.durationConstructionYrs || 0
    const durationOperationsYrs = scenarioParams.durationOperationsYrs || 0
    const totalYears = Math.ceil(durationConstructionYrs + durationOperationsYrs)

    const rawConstructionGva = data.portfolioYearlyConstructionGva || 0
    const rawOperationsGva = data.portfolioYearlyOperationsGva || 0

    const getThisYearValues = (t) => {
        const noise = 0.80 + Math.random() * 0.40

        return (
            {
                constructionGva: t < durationConstructionYrs ? rawConstructionGva * noise : 0,
                operationsGva: t < durationConstructionYrs ? 0 : rawOperationsGva * noise,
            }
        )
    }

    const buildPoints = (t, prevConstructionRaw, prevOperationsRaw, prevIntermediateConsumption) => {
        const thisYear = getThisYearValues(t)

        const cumConstructionRaw = prevConstructionRaw + thisYear.constructionGva
        const cumOperationsRaw = prevOperationsRaw + thisYear.operationsGva

        const point = {
            year: t,
            name: `Rok ${t + 1}`,
            constructionGva: toBillions(cumConstructionRaw, 3),
            operationsGva: toBillions(cumOperationsRaw, 3),
            totalGva: toBillions(cumConstructionRaw + cumOperationsRaw, 3),
        }

        if (t === totalYears) return [point]
        return [point, ...buildPoints(t + 1, cumConstructionRaw, cumOperationsRaw)]
    }

    return buildPoints(0, 0, 0)
}

export const EconomyGvaTimelineChart = ({ data, activeScenario = "REALISTIC", chartCopy }) => {
    const params = useModelStore(state => state.params)

    if (!data || !params || !chartCopy) return null
    const currentData = data[activeScenario]

    const gvaTimelineData = useMemo(() =>
        prepareChartData(currentData, params.SCENARIOS[activeScenario])
        , [data, activeScenario, params])

    return (
        <ChartCard
            title={chartCopy.title}
            description={chartCopy.description}
            icon={<TrendingUp className="h-4 w-4" />}
            iconBgClass="bg-indigo-100/70 text-indigo-700"
            cardClass="border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30"
            hoverExplanation={chartCopy.hoverExplanation}
        >
            <ChartContainer config={chartConfigGvaTimeline} className="w-full mt-2 h-[350px] aspect-auto">
                <ComposedChart data={gvaTimelineData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                    <defs>
                        <linearGradient id="colorConstruction" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-constructionGva)" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="var(--color-constructionGva)" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="colorOperations" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-operationsGva)" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="var(--color-operationsGva)" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                    <StyledYAxis
                        tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} mld. Kč`}
                    />
                    <ChartTooltip content={<ChartTooltipContent className="w-[110%]" unit="mld. Kč" />} />
                    <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                    <Area
                        type="monotone"
                        dataKey="constructionGva"
                        name="HPH z výstavby"
                        stackId="a"
                        stroke="var(--color-constructionGva)"
                        strokeWidth={1.5}
                        fill="url(#colorConstruction)"
                    />
                    <Area
                        type="monotone"
                        dataKey="operationsGva"
                        name="HPH z provozu"
                        stackId="a"
                        stroke="var(--color-operationsGva)"
                        strokeWidth={1.5}
                        fill="url(#colorOperations)"
                    />
                    <Line
                        type="monotone"
                        dataKey="totalGva"
                        name="Celková HPH"
                        stroke="var(--color-totalGva)"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ChartContainer>
        </ChartCard>
    )
}
