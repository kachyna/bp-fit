import { ScreenHeader } from "../components/screen-header"
import { TextHoverCard } from "../components/text-hover-card"
import { NumberHoverCard } from "@/components/model-screens/components/number-hover-card"
import { PortfolioBreakdown } from "./portfolio-breakdown"
import { getAggregateCopy } from "../texts/aggregate-texts"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export const AggregateModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
    const aggregateCopy = getAggregateCopy(
        {
            ...data?.[activeScenario],
            portfolioTotalPower: data?.portfolioTotalPower ?? 0,
            portfolioMaxEnergyConsumption: data?.portfolioMaxEnergyConsumption ?? 0,
            portfolioMaxITConsumption: data?.portfolioMaxITConsumption ?? 0
        }
    )

    return (
        <div className="space-y-6 animate-fade-in">

            <Collapsible defaultOpen={false} className="group/collapsible">
                <CollapsibleTrigger asChild>
                    <div className="cursor-pointer flex items-center justify-between hover:opacity-80 transition-opacity">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Jak model používat?</h2>
                            <p className="text-sm text-slate-500">Klikni na mě a zjisti více informací.</p>
                        </div>
                        <ChevronDown className="size-6 text-slate-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-6 space-y-6 overflow-visible">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {["about", "settingsTip"].map((key) => {
                            const card = aggregateCopy[key]
                            return (
                                <TextHoverCard
                                    key={key}
                                    title={card.title}
                                    description={card.description}
                                    color={card.color}
                                    icon={card.icon}
                                    className={card.className}
                                    hoverContent={card.hoverContent}
                                >
                                    {card.children}
                                </TextHoverCard>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {["guide", "scenarios", "credits"].map((key) => {
                            const card = aggregateCopy[key]
                            return (
                                <TextHoverCard
                                    key={key}
                                    title={card.title}
                                    description={card.description}
                                    color={card.color}
                                    icon={card.icon}
                                    className={card.className}
                                    hoverContent={card.hoverContent}
                                >
                                    {card.children}
                                </TextHoverCard>
                            )
                        })}
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <ScreenHeader
                title={aggregateCopy.header.title}
                subtitle={aggregateCopy.header.subtitle}
                analyzedData={data}
                pulseColor="bg-emerald-500"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 group/row">
                    {aggregateCopy.kpis.map((kpi) => (
                        <NumberHoverCard
                            key={kpi.key}
                            title={kpi.title}
                            color={kpi.color}
                            icon={kpi.icon}
                            mainText={kpi.mainText}
                            expandOnRowHover={true}
                        />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <PortfolioBreakdown />
                </div>

            </div>

        </div>
    )
}