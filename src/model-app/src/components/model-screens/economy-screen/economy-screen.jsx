import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Landmark } from "lucide-react"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { getEconomyCopy } from "./economy-content"
import { useModelStore } from "@/store/useModelStore"
import { EconomyRevenuesChart } from "./economy-revenues-chart"
import { EconomyGvaTimelineChart } from "./economy-gva-timeline-chart"



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
            <Card className="border-amber-100 bg-linear-to-r from-amber-500/10 via-slate-50 to-indigo-500/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200/80 group cursor-default">
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
                <EconomyRevenuesChart comparisonData={comparisonData} chartCopy={economyCopy.chartRevenues} />

                {/* GRAF 2: Kumulativní vývoj HPH v čase */}
                <EconomyGvaTimelineChart gvaTimelineData={gvaTimelineData} chartCopy={economyCopy.chartGvaTimeline} />
            </div>
        </div>
    )
}