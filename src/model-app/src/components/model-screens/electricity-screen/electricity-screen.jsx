
import { Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NumberHoverCard } from "@/components/model-screens/components/number-hover-card"
import { useModelStore } from "@/store/useModelStore"
import { getElectricityCopy } from "../texts/electricity-texts"
import { ElectricityBarometerChart } from "./grid-capacity-gauge"
import { ElectricityScissorsChart } from "./electricity-scissors-chart"
import { PueSimulator } from "./pue-simulator"
import { TabbedContextCard } from "../components/tabbed-context-card"
import { ScreenHeader } from "../components/screen-header"
import { TextHoverCard } from "../components/text-hover-card"

export const ElectricityModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
    const params = useModelStore(state => state.params)

    const electricityCopy = getElectricityCopy(
        {
            ...data[activeScenario],
            portfolioTotalPower: data.portfolioTotalPower,
            portfolioMaxEnergyConsumption: data.portfolioMaxEnergyConsumption,
            portfolioMaxITConsumption: data.portfolioMaxITConsumption
        }
    )

    if (!data || !params || !electricityCopy) return null

    const totalPowerValue = data.portfolioTotalPower || 0

    return (
        <div className="flex flex-col gap-6">
            {/* Dashboard Header */}
            <ScreenHeader
                title="Elektřina a energetická bilance"
                subtitle="Modelování celkového příkonu, reálné spotřeby a zatížení přenosové soustavy ČR."
                analyzedData={data}
                pulseColor="bg-yellow-500"
            />

            <TextHoverCard
                title={electricityCopy.intro.title}
                description={electricityCopy.intro.description}
                color="amber"
                icon={<Zap className="h-4 w-4 fill-yellow-500/80" />}
                hoverContent={electricityCopy.intro.hover}
            >
                {electricityCopy.intro.children}
            </TextHoverCard>

            {/* 3. SCISSORS CHART & PUE SIMULATOR ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ElectricityScissorsChart
                    data={data}
                    chartCopy={electricityCopy.chartScissors}
                    className="lg:col-span-2"
                />
                <ElectricityBarometerChart
                    value={totalPowerValue}
                    chartCopy={electricityCopy.chartGridCapacity}
                    className="lg:col-span-1"
                />
            </div>

            {/* 2. KPI CARDS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 group/row">
                {["installedPower", "realConsumption", "czComparison", "energyCosts"]
                    .map((category) => (
                        <NumberHoverCard
                            key={category}
                            title={electricityCopy[category].title}
                            color={electricityCopy[category].color}
                            icon={electricityCopy[category].icon}
                            mainText={electricityCopy[category].mainText}
                            comparisonHeader={electricityCopy[category].comparisonHeader}
                            comparisons={electricityCopy[category].comparisons}
                            expandOnRowHover={true}
                        >
                            {electricityCopy[category].children}
                        </NumberHoverCard>
                    ))}
            </div>

            {/* 4. BAROMETER & CONTEXT/INNOVATION ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PueSimulator
                    chartCopy={electricityCopy.pueSimulator}
                    className="lg:col-span-1"
                />

                <TabbedContextCard
                    contextCopy={electricityCopy.contextCard}
                    theme="electricity"
                    textContainerClassName="rounded-xl border border-slate-100 bg-slate-50/40 p-5 min-h-[140px] flex flex-col justify-center transition-all duration-300"
                    hasHoverExpand={false}
                    className="lg:col-span-2"
                />
            </div>
        </div>
    )
}