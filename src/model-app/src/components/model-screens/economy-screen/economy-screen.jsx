import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Landmark, TrendingUp, Users, Wallet, BarChart3 } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Line, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { ComparisonData } from "@/components/model-screens/components/comparisons"
import { getEconomyCopy, economySources } from "@/components/model-screens/components/economy-content"
import { useModelStore } from "@/store/useModelStore"

const chartConfigRevenues = {
    gva: { label: "Hrubá přidaná hodnota (HPH)", color: "#10b981" },
    electricity: { label: "Náklady na elektřinu", color: "#06b6d4" },
    otherOpex: { label: "Ostatní provozní náklady", color: "#6366f1" },
}

const chartConfigGvaTimeline = {
    constructionGva: { label: "HPH z výstavby (kumulativní)", color: "#f59e0b" },
    operationsGva: { label: "HPH z provozu (kumulativní)", color: "#10b981" },
    totalGva: { label: "Celková HPH (kumulativní)", color: "#6366f1" },
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

const toMillions = (val) => Number(((val || 0) / 1000000).toFixed(3))


export const EconomyModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
    const currentData = getScenarioData(data, activeScenario)
    const economyCopy = getEconomyCopy(currentData)

    const comparisonData = useMemo(() => {
        return ["PESIMISTIC", "REALISTIC", "OPTIMISTIC"].map((scenario) => {
            const sData = getScenarioData(data, scenario)
            return {
                key: scenario,
                name: scenario === "PESIMISTIC" ? "Pesimistický" : scenario === "REALISTIC" ? "Realistický" : "Optimistický",

                // Chart 1: Revenue decomposition (summing to portfolioYearlySales)
                gva: toMillions(sData.portfolioYearlyOperationsGva),
                electricity: toMillions(sData.portfolioElectricityCosts),
                otherOpex: toMillions(sData.portfolioOtherOpex),
            }
        })
    }, [data])

    const params = useModelStore(state => state.params)

    const gvaTimelineData = useMemo(() => {
        if (!data || !params) return []
        const scenarioParams = params.SCENARIOS[activeScenario]
        if (!scenarioParams) return []

        const durationConstructionYrs = scenarioParams.durationConstructionYrs || 0
        const durationOperationsYrs = scenarioParams.durationOperationsYrs || 0
        const totalConstructionGva = toMillions(currentData.portfolioYearlyConstructionGva || 0)
        const yearlyOperationsGva = toMillions(currentData.portfolioYearlyOperationsGva || 0)

        const totalYears = Math.ceil(durationConstructionYrs + durationOperationsYrs)
        const chartPoints = []

        for (let t = 0; t <= totalYears; t++) {
            // Calculate cumulative construction GVA
            const cumConstructionGva = durationConstructionYrs > 0
                ? (Math.min(t, durationConstructionYrs) / durationConstructionYrs) * totalConstructionGva
                : 0

            // Calculate cumulative operations GVA
            const cumOperationsGva = Math.max(0, t - durationConstructionYrs) * yearlyOperationsGva

            const totalCumGva = cumConstructionGva + cumOperationsGva

            chartPoints.push({
                year: t,
                name: `Rok ${t}`,
                constructionGva: Number(cumConstructionGva.toFixed(3)),
                operationsGva: Number(cumOperationsGva.toFixed(3)),
                totalGva: Number(totalCumGva.toFixed(3))
            })
        }

        return chartPoints
    }, [data, activeScenario, params, currentData])

    return (
        <div className="flex flex-col gap-6">
            {/* 1. ÚVODNÍ KONTEXTOVÁ KARTA */}
            <Card className="border-amber-100 bg-gradient-to-r from-amber-500/10 via-slate-50 to-indigo-500/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200/80 group cursor-default">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100/70 text-amber-700 rounded-md">
                            <Landmark className="h-4 w-4" />
                        </div>
                        {economyCopy.intro.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
                    {economyCopy.intro.children}

                    {economyCopy.intro.hover && (
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                            <div className="overflow-hidden">
                                <div className="space-y-2 text-sm text-slate-600 mt-4 leading-relaxed">
                                    {economyCopy.intro.hover}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 2. KPI KARTY ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 group/row">
                {["capex", "gva", "fte", "taxes"].map((category) => {
                    return (
                        <ESGHoverCard
                            key={category}
                            title={economyCopy[category].title}
                            color={economyCopy[category].color}
                            icon={economyCopy[category].icon}
                            mainText={economyCopy[category].mainText}
                            comparisonHeader={economyCopy[category].comparisonHeader}
                            comparisons={economyCopy[category].comparisons}
                            expandOnRowHover={true}
                        >
                            {economyCopy[category].children}
                        </ESGHoverCard>
                    )
                })}
            </div>

            {/* 3. VIZUALIZACE CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* GRAF 1: Dekompozice tržeb */}
                <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-slate-50/20 to-cyan-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200/80 group cursor-default">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-md">
                                <BarChart3 className="h-4 w-4" />
                            </div>
                            {economyCopy.chartRevenues.title}
                        </CardTitle>
                        <CardDescription className="text-slate-500 pl-9">
                            {economyCopy.chartRevenues.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-6">
                        <div className="w-full mt-2 h-[350px]">
                            <ChartContainer config={chartConfigRevenues} className="w-full h-full aspect-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={comparisonData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 10 }}
                                            tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} mil. Kč`}
                                            width={100}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value, name, item) => {
                                                        const label = chartConfigRevenues[item.dataKey]?.label || name
                                                        return (
                                                            <>
                                                                <div
                                                                    className="shrink-0 rounded-[2px] h-2.5 w-2.5"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                                <div className="flex flex-1 justify-between items-center leading-none">
                                                                    <span className="text-muted-foreground">{label}</span>
                                                                    <span className="font-mono font-medium text-foreground tabular-nums ml-2">
                                                                        {Number(value).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mil. Kč
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            }
                                        />
                                        <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                                        <Bar
                                            dataKey="gva"
                                            name="Hrubá přidaná hodnota (HPH)"
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
                                            name="Ostatní provozní náklady"
                                            stackId="a"
                                            fill="var(--color-otherOpex)"
                                            opacity={0.55}
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={50}
                                            activeBar={{ opacity: 0.9, stroke: "var(--color-otherOpex)", strokeWidth: 1 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>

                        {/* Hover vysvětlení pod grafem */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                            <div className="overflow-hidden">
                                <div className="border-t border-dashed mt-4 pt-4 border-slate-200 text-xs text-slate-600 leading-relaxed">
                                    {economyCopy.chartRevenues.hoverExplanation}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* GRAF 2: Kumulativní vývoj HPH v čase */}
                <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200/80 group cursor-default">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-100/70 text-indigo-700 rounded-md">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            {economyCopy.chartGvaTimeline.title}
                        </CardTitle>
                        <CardDescription className="text-slate-500 pl-9">
                            {economyCopy.chartGvaTimeline.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-6">
                        <div className="w-full mt-2 h-[350px]">
                            <ChartContainer config={chartConfigGvaTimeline} className="w-full h-full aspect-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={gvaTimelineData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                                        <defs>
                                            <linearGradient id="colorConstruction" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-constructionGva)" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="var(--color-constructionGva)" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorOperations" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-operationsGva)" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="var(--color-operationsGva)" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 10 }}
                                            tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} mil. Kč`}
                                            width={100}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value, name, item) => {
                                                        const label = chartConfigGvaTimeline[item.dataKey]?.label || name
                                                        return (
                                                            <>
                                                                <div
                                                                    className="shrink-0 rounded-[2px] h-2.5 w-2.5"
                                                                    style={{ backgroundColor: item.color }}
                                                                />
                                                                <div className="flex flex-1 justify-between items-center leading-none">
                                                                    <span className="text-muted-foreground">{label}</span>
                                                                    <span className="font-mono font-medium text-foreground tabular-nums ml-2">
                                                                        {Number(value).toLocaleString("cs-CZ", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} mil. Kč
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            }
                                        />
                                        <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />
                                        
                                        <Area
                                            type="monotone"
                                            dataKey="constructionGva"
                                            name="HPH z výstavby (kumulativní)"
                                            stackId="a"
                                            stroke="var(--color-constructionGva)"
                                            strokeWidth={1.5}
                                            fill="url(#colorConstruction)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="operationsGva"
                                            name="HPH z provozu (kumulativní)"
                                            stackId="a"
                                            stroke="var(--color-operationsGva)"
                                            strokeWidth={1.5}
                                            fill="url(#colorOperations)"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="totalGva"
                                            name="Celková HPH (kumulativní)"
                                            stroke="var(--color-totalGva)"
                                            strokeWidth={2.5}
                                            dot={false}
                                            activeDot={{ r: 6 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>

                        {/* Hover vysvětlení pod grafem */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                            <div className="overflow-hidden">
                                <div className="border-t border-dashed mt-4 pt-4 border-slate-200 text-xs text-slate-600 leading-relaxed">
                                    {economyCopy.chartGvaTimeline.hoverExplanation}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}