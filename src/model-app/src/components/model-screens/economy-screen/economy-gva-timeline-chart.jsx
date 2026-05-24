import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Line, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfigGvaTimeline = {
    constructionGva: { label: "HPH z výstavby (kumulativní)", color: "#f59e0b" },
    operationsGva: { label: "HPH z provozu (kumulativní)", color: "#10b981" },
    totalGva: { label: "Celková HPH (kumulativní)", color: "#6366f1" },
}

export const EconomyGvaTimelineChart = ({ gvaTimelineData, chartCopy }) => {
    if (!gvaTimelineData || !chartCopy) return null;

    return (
        <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200/80 group cursor-default">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100/70 text-indigo-700 rounded-md">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    {chartCopy.title}
                </CardTitle>
                <CardDescription className="text-slate-500 pl-9">
                    {chartCopy.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
                <div className="w-full mt-2 h-[350px]">
                    <ChartContainer config={chartConfigGvaTimeline} className="w-full h-full aspect-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={gvaTimelineData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                                <defs>
                                    <linearGradient id="colorConstruction" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-constructionGva)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--color-constructionGva)" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorOperations" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-operationsGva)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--color-operationsGva)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
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
                                                const label = chartConfigGvaTimeline[item.dataKey]?.label || name
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
                                
                                <Area
                                    type="monotone"
                                    dataKey="constructionGva"
                                    name="HPH z výstavby (kumulativní)"
                                    stackId="a"
                                    stroke="var(--color-constructionGva)"
                                    strokeWidth={1.5}
                                    fill="url(#colorConstruction)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="operationsGva"
                                    name="HPH z provozu (kumulativní)"
                                    stackId="a"
                                    stroke="var(--color-operationsGva)"
                                    strokeWidth={1.5}
                                    fill="url(#colorOperations)"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="totalGva"
                                    name="Celková HPH (kumulativní)"
                                    stroke="var(--color-totalGva)"
                                    strokeWidth={2.5}
                                    dot={false}
                                    activeDot={{ r: 6 }}
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
