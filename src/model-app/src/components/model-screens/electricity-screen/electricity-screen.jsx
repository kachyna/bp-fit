
import { Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { useModelStore } from "@/store/useModelStore"
import { getElectricityCopy } from "../texts/electricity-texts"
import { ElectricityBarometerChart } from "./grid-capacity-gauge"
import { ElectricityScissorsChart } from "./electricity-scissors-chart"
import { PueSimulator } from "./pue-simulator"

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT COLUMN: Intro, Charts, and Simulator (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-6">

                {/* INTRO CARD */}
                <Card className="border-yellow-200 bg-linear-to-r from-yellow-500/15 via-amber-50/40 to-yellow-500/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-yellow-300/80 group cursor-default">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                            <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-md">
                                <Zap className="h-4 w-4 fill-yellow-500/80" />
                            </div>
                            {electricityCopy.intro.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
                        {electricityCopy.intro.children}

                        {electricityCopy.intro.hover && (
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                <div className="overflow-hidden">
                                    <div className="space-y-2 text-sm text-slate-600 mt-4 leading-relaxed">
                                        {electricityCopy.intro.hover}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ElectricityBarometerChart value={totalPowerValue} chartCopy={electricityCopy.chartGridCapacity} />
                    <PueSimulator chartCopy={electricityCopy.pueSimulator} />
                </div>
                <ElectricityScissorsChart data={data} chartCopy={electricityCopy.chartScissors} />
            </div>

            {/* RIGHT COLUMN: Vertical Stack of summary/KPI cards (lg:col-span-1) */}
            <div className="lg:col-span-1 flex flex-col gap-4">
                {["installedPower", "realConsumption", "czComparison", "energyCosts"]
                    .map((category) => (
                        <ESGHoverCard
                            key={category}
                            title={electricityCopy[category].title}
                            color={electricityCopy[category].color}
                            icon={electricityCopy[category].icon}
                            mainText={electricityCopy[category].mainText}
                            comparisonHeader={electricityCopy[category].comparisonHeader}
                            comparisons={electricityCopy[category].comparisons}
                        >
                            {electricityCopy[category].children}
                        </ESGHoverCard>
                    ))}
            </div>
        </div>
    )
}