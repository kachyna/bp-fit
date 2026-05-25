import { Landmark } from "lucide-react"
import { NumberHoverCard } from "@/components/model-screens/components/number-hover-card"
import { getEconomyCopy } from "../texts/economy-texts"
import { EconomyRevenuesChart } from "./economy-revenues-chart"
import { EconomyGvaTimelineChart } from "./economy-gva-timeline-chart"
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

            {/* 2. KPI CARDS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 group/row">
                {["capex", "gva", "fte", "taxes"].map((category) => {
                    return (
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