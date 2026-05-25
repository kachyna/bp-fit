import { useState } from "react"
import { Gauge } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { ChartCard } from "@/components/model-screens/components/chart-card"

const maxTransformationCapacity = 24500 //MVA
const maxPowerDemand = 12250 //MW
const normalPowerDemand = 8000 //MW
const minPowerDemand = 6000 //MW

const GridCapacityBarometer = ({ value, gridLoad }) => {
    const minVal = minPowerDemand
    const maxVal = maxPowerDemand
    const totalLoad = gridLoad + value
    const clampedVal = Math.min(Math.max(totalLoad, minVal), maxVal)

    // SVG radial coordinates calculation
    const angle = -180 + ((clampedVal - minVal) / (maxVal - minVal)) * 180
    const angleRad = (angle * Math.PI) / 180

    const needleLength = 65
    const needleX = 100 + needleLength * Math.cos(angleRad)
    const needleY = 100 + needleLength * Math.sin(angleRad)

    // Dynamic thresholds: Safe up to 9500 MW, Warning up to 11500 MW, Danger up to 12250 MW
    const greenLimit = 9500
    const orangeLimit = 11500

    // Green end coordinate
    const greenAngle = -180 + ((Math.min(greenLimit, maxVal) - minVal) / (maxVal - minVal)) * 180
    const greenAngleRad = (greenAngle * Math.PI) / 180
    const greenX = (100 + 80 * Math.cos(greenAngleRad)).toFixed(2)
    const greenY = (100 + 80 * Math.sin(greenAngleRad)).toFixed(2)

    // Orange end coordinate
    const orangeAngle = -180 + ((Math.min(orangeLimit, maxVal) - minVal) / (maxVal - minVal)) * 180
    const orangeAngleRad = (orangeAngle * Math.PI) / 180
    const orangeX = (100 + 80 * Math.cos(orangeAngleRad)).toFixed(2)
    const orangeY = (100 + 80 * Math.sin(orangeAngleRad)).toFixed(2)

    return (
        <div className="flex flex-col items-center justify-center p-2 w-full animate-fade-in">
            <svg viewBox="0 0 200 120" className="w-full max-w-[260px] overflow-visible">
                {/* Gray Background Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                />

                {/* Safe Green Zone */}
                <path
                    d={`M 20 100 A 80 80 0 0 1 ${greenX} ${greenY}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="14"
                    opacity="0.85"
                />

                {/* Warning Orange Zone */}
                <path
                    d={`M ${greenX} ${greenY} A 80 80 0 0 1 ${orangeX} ${orangeY}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="14"
                    opacity="0.85"
                />

                {/* Danger Red Zone */}
                <path
                    d={`M ${orangeX} ${orangeY} A 80 80 0 0 1 180 100`}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="14"
                    opacity="0.85"
                />

                {/* Center Hub and Needle */}
                <line
                    x1="100"
                    y1="100"
                    x2={needleX}
                    y2={needleY}
                    stroke="#1e293b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="7" fill="#1e293b" />
                <circle cx="100" cy="100" r="3" fill="#ffffff" />

                {/* Min/Max Labels */}
                <text x="20" y="114" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold font-mono">{minVal.toLocaleString("cs-CZ")} MW</text>
                <text x="180" y="114" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold font-mono">{maxVal.toLocaleString("cs-CZ")} MW</text>
            </svg>

            <div className="text-center -mt-1 space-y-1 w-full">
                <div className="text-2xl font-bold text-slate-800 tracking-tight">
                    {totalLoad.toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} MW
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                    (Zatížení sítě {gridLoad.toLocaleString("cs-CZ")} MW + projekt {value.toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} MW)
                </div>
                <div className="text-xs font-semibold pt-1">
                    {totalLoad < 9500 ? (
                        <span className="text-emerald-700 bg-emerald-100/70 border border-emerald-200/50 px-2.5 py-1 rounded-full">
                            Bezpečné zatížení sítě
                        </span>
                    ) : totalLoad < 11500 ? (
                        <span className="text-amber-700 bg-amber-100/70 border border-amber-200/50 px-2.5 py-1 rounded-full">
                            Vyžaduje zapojení regulačních záloh
                        </span>
                    ) : (
                        <span className="text-rose-700 bg-rose-100/70 border border-rose-200/50 px-2.5 py-1 rounded-full">
                            Kritické zatížení / riziko odpojení spotřebičů
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export const ElectricityBarometerChart = ({ value, chartCopy }) => {
    const [gridLoad, setGridLoad] = useState(8000)

    if (!chartCopy) return null

    return (
        <ChartCard
            title={chartCopy.title}
            description={chartCopy.description}
            icon={<Gauge className="h-4 w-4" />}
            iconBgClass="bg-rose-100/70 text-rose-700"
            cardClass="border-rose-100 bg-linear-to-br from-rose-50/40 via-slate-50/20 to-amber-50/30"
        >
            <div className="w-full mt-2 px-9 pb-4 flex flex-col gap-4">
                <div className="min-h-[220px] flex items-center justify-center">
                    <GridCapacityBarometer value={value} gridLoad={gridLoad} />
                </div>

                {/* Collapsible hover content container */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                        <div className="border-t border-rose-100/50 pt-4 space-y-4">
                            {/* Interactive Grid Load Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                                    <span>Aktuální zatížení sítě ČR (mimo projekt)</span>
                                    <span className="text-sm font-bold text-rose-600 bg-rose-50/80 px-2.5 py-0.5 rounded-md font-mono border border-rose-100">
                                        {gridLoad.toLocaleString("cs-CZ")} MW
                                    </span>
                                </div>
                                <Slider
                                    min={minPowerDemand}
                                    max={maxPowerDemand}
                                    step={100}
                                    value={[gridLoad]}
                                    onValueChange={(vals) => setGridLoad(vals[0])}
                                    className="py-1 cursor-pointer"
                                />
                                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                                    <span>{minPowerDemand.toLocaleString("cs-CZ")} MW (Min)</span>
                                    <span>{normalPowerDemand.toLocaleString("cs-CZ")} MW (Běžné)</span>
                                    <span>{maxPowerDemand.toLocaleString("cs-CZ")} MW (Špička)</span>
                                </div>
                            </div>

                            {/* Additional comment under slider */}
                            <div className="text-[11px] text-slate-600 leading-relaxed bg-amber-500/5 border border-amber-200/30 rounded-lg p-2.5">
                                <p>
                                    <strong>Poznámka k přenosové soustavě:</strong> Zatížení sítě v ČR kolísá podle denní doby a ročního období.
                                    Při vysokém zatížení (např. zimní špičky nad 10 GW) čelí přenosová soustava výrazným limitům.
                                    Připojením datových center se volná kapacita dále snižuje a může dojít k nutnosti aktivovat podpůrné služby (regulační zálohy) k udržení rovnováhy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChartCard>
    )
}
