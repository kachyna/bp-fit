import { useState } from "react"
import { ArrowRightLeft } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { ChartCard } from "@/components/model-screens/components/chart-card"

export const PueSimulator = ({ chartCopy }) => {
    const [pue, setPue] = useState(1.4)

    const pctEffective = ((1.0 / pue) * 100).toFixed(1)
    const pctOverhead = (((pue - 1.0) / pue) * 100).toFixed(1)

    if (!chartCopy) return null

    return (
        <ChartCard
            title={chartCopy.title}
            description={chartCopy.description}
            icon={<ArrowRightLeft className="h-4 w-4" />}
            iconBgClass="bg-indigo-100/70 text-indigo-700"
            cardClass="border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-emerald-50/30"
        >
            <div className="w-full mt-2 px-9 pb-4 pt-2 space-y-6 flex flex-col justify-center h-full">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                        <span>Hodnota PUE</span>
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50/80 px-2.5 py-0.5 rounded-md font-mono border border-indigo-100">
                            {pue.toFixed(2)}
                        </span>
                    </div>
                    <Slider
                        min={1.0}
                        max={2.5}
                        step={0.05}
                        value={[pue]}
                        onValueChange={(vals) => setPue(vals[0])}
                        className="py-1 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                        <span>Ideál</span>
                        <span>Standardard</span>
                        <span>Zastaralé</span>
                        <span>Neefektivní</span>
                    </div>
                </div>

                <div className="space-y-1.5 pt-1">
                    <div className="h-5 w-full bg-slate-100 rounded-md overflow-hidden flex text-[10px] font-bold text-white shadow-inner">
                        <div style={{ width: `${pctEffective}%` }} className="bg-emerald-500 flex items-center justify-center transition-all duration-300 ease-out">
                            {parseFloat(pctEffective) > 20 && `${pctEffective}%`}
                        </div>
                        <div style={{ width: `${pctOverhead}%` }} className="bg-amber-500 flex items-center justify-center transition-all duration-300 ease-out">
                            {parseFloat(pctOverhead) > 20 && `${pctOverhead}%`}
                        </div>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-emerald-700 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                            Užitečná IT spotřeba
                        </span>
                        <span className="text-amber-700 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
                            Režie chlazení a napájení
                        </span>
                    </div>
                </div>
            </div>
        </ChartCard>
    )
}
