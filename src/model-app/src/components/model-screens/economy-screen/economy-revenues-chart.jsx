import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfigRevenues = {
    gva: { label: "Hrubá přidaná hodnota (HPH)", color: "#10b981" },
    electricity: { label: "Náklady na elektřinu", color: "#06b6d4" },
    otherOpex: { label: "Ostatní provozní náklady", color: "#6366f1" },
}

export const EconomyRevenuesChart = ({ comparisonData, chartCopy }) => {
    if (!comparisonData || !chartCopy) return null;

    return (
        <Card className="border-emerald-100 bg-linear-to-br from-emerald-50/40 via-slate-50/20 to-cyan-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200/80 group cursor-default">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-md">
                        <BarChart3 className="h-4 w-4" />
                    </div>
                    {chartCopy.title}
                </CardTitle>
                <CardDescription className="text-slate-500 pl-9">
                    {chartCopy.description}
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
                            {chartCopy.hoverExplanation}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
