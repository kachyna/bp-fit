import { Landmark } from "lucide-react"
import { NumberHoverCard } from "@/components/model-screens/components/number-hover-card"
import { getEconomyCopy } from "../texts/economy-texts"
import { EconomyRevenuesChart } from "./economy-revenues-chart"
import { EconomyGvaTimelineChart } from "./economy-gva-timeline-chart"
import { TabbedContextCard } from "../components/tabbed-context-card"
import { ScreenHeader } from "../components/screen-header"
import { TextHoverCard } from "../components/text-hover-card"

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

            <TextHoverCard
                title={economyCopy.intro.title}
                description={economyCopy.intro.description}
                color="blue"
                icon={<Landmark className="h-4 w-4" />}
                hoverContent={economyCopy.intro.hover}
            >
                {economyCopy.intro.children}
            </TextHoverCard>

            {/* KPI CARDS & CONTEXT CARD ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* First row of 2 cards (capex, gva) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group/row">
                        {["capex", "gva"].map((category) => (
                            <NumberHoverCard
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
                            </NumberHoverCard>
                        ))}
                    </div>

                    {/* Second row of 2 cards (fte, taxes) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group/row">
                        {["fte", "taxes"].map((category) => (
                            <NumberHoverCard
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
                            </NumberHoverCard>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <TabbedContextCard
                        contextCopy={economyCopy.contextCard}
                        theme="economy"
                        size="sm"
                        headerClassName="pb-2"
                        contentClassName="px-4 pb-4"
                        tabsGridClassName="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"
                        buttonClassName="py-2 px-2.5"
                        textContainerClassName="rounded-xl border border-slate-100 bg-slate-50/40 px-3 pt-3 transition-all duration-500 ease-in-out overflow-hidden min-h-[75px] max-h-[175px] group-hover/context:max-h-[300px] flex flex-col justify-start"
                        hasHoverExpand={true}
                        className="h-full"
                    />
                </div>
            </div>

            {/* 3. CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EconomyRevenuesChart data={data} chartCopy={economyCopy.chartRevenues} />
                <EconomyGvaTimelineChart data={data} activeScenario={activeScenario} chartCopy={economyCopy.chartGvaTimeline} />
            </div>
        </div>
    )
}