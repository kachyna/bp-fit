import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Landmark } from "lucide-react"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { getEconomyCopy } from "../texts/economy-texts"
import { EconomyRevenuesChart } from "./economy-revenues-chart"
import { EconomyGvaTimelineChart } from "./economy-gva-timeline-chart"
import { ScreenHeader } from "../components/screen-header"

export const EconomyModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
    const currentData = data[activeScenario]
    const economyCopy = getEconomyCopy(currentData)

    return (
        <div className="flex flex-col gap-6">
            {/* Dashboard Header */}
            <ScreenHeader
                title="Ekonomické dopady a investice"
                subtitle="Modelování investičních (CAPEX) a provozních (OPEX) nákladů, přidané hodnoty (HPH) a daní."
                analyzedData={data}
                pulseColor="bg-emerald-500"
            />

            {/* 1. INTRO CARD */}
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

            {/* 2. KPI CARDS ROW */}
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

            {/* 3. CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EconomyRevenuesChart data={data} chartCopy={economyCopy.chartRevenues} />
                <EconomyGvaTimelineChart data={data} activeScenario={activeScenario} chartCopy={economyCopy.chartGvaTimeline} />
            </div>
        </div>
    )
}