import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartConfig = {
  it_energyTWh: { label: "Spotřeba IT (TWh)", color: "#06b6d4" },
  energyTWh: { label: "Celková spotřeba (TWh)", color: "#2563eb" },
  emissionsThousandTonnes: { label: "Emise CO₂ (tis. t)", color: "#f43f5e" },
}

export const ESGChart = ({ comparisonData, chartCopy }) => {
  if (!comparisonData || !chartCopy) return null;

  return (
    <Card className="border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200/80 group cursor-default">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100/70 text-indigo-700 rounded-md">
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
          <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={comparisonData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-semibold fill-slate-500" />

                {/* Left axis: Energy in TWh */}
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} TWh`}
                  width={100}
                />

                {/* Right axis: CO2 emissions in thousands of tons */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  tickFormatter={(value) => `${value.toLocaleString("cs-CZ")} tis. t`}
                  width={100}
                />

                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent verticalAlign="top" />} />

                <Bar
                  yAxisId="left"
                  dataKey="it_energyTWh"
                  name="Spotřeba IT vybavení (TWh)"
                  fill="var(--color-it_energyTWh)"
                  opacity={0.4}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                  activeBar={{ opacity: 0.85, stroke: "var(--color-it_energyTWh)", strokeWidth: 1 }}
                />

                <Bar
                  yAxisId="left"
                  dataKey="energyTWh"
                  name="Celková roční spotřeba (TWh)"
                  fill="var(--color-energyTWh)"
                  opacity={0.4}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                  activeBar={{ opacity: 0.85, stroke: "var(--color-energyTWh)", strokeWidth: 1 }}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="emissionsThousandTonnes"
                  name="Roční emise CO₂ (tis. t)"
                  stroke="var(--color-emissionsThousandTonnes)"
                  strokeWidth={2.5}
                  opacity={0.8}
                  dot={{ r: 4, strokeWidth: 1.5, stroke: "var(--color-emissionsThousandTonnes)", fill: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff", fill: "var(--color-emissionsThousandTonnes)" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Hover explanation below the chart */}
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
