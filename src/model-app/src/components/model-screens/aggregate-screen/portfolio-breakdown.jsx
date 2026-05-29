import { useMemo } from "react"
import { Database, HelpCircle } from "lucide-react"
import { useModelStore } from "@/store/useModelStore"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getAggregateCopy } from "../texts/aggregate-texts"

const staticTexts = getAggregateCopy({}, {}, "").portfolio

const getDcBreakdown = (datacenters) => {
    let totalCount = 0;
    let totalPower = 0;
    const types = {
        coloc: { count: 0, power: 0, label: "Colocation", color: "bg-blue-500", textColor: "text-blue-700", border: "border-blue-100", bg: "bg-blue-50/40" },
        training: { count: 0, power: 0, label: "AI Training", color: "bg-violet-500", textColor: "text-violet-700", border: "border-violet-100", bg: "bg-violet-50/40" },
        inference: { count: 0, power: 0, label: "AI Inference", color: "bg-amber-500", textColor: "text-amber-700", border: "border-amber-100", bg: "bg-amber-50/40" }
    };

    datacenters.forEach(dc => {
        if (types[dc.type]) {
            const c = dc.count || 0;
            types[dc.type].count += c;
            types[dc.type].power += (dc.itPower || 0) * c;
            totalCount += c;
            totalPower += (dc.itPower || 0) * c;
        }
    });

    const list = Object.entries(types).map(([key, data]) => {
        const percentage = totalPower > 0 ? (data.power / totalPower) * 100 : 0;
        return {
            key,
            ...data,
            percentage,
            formattedPower: data.power.toLocaleString("cs-CZ"),
            formattedPercentage: percentage.toFixed(0)
        };
    });

    return { 
        list, 
        totalCount, 
        totalPower, 
        formattedTotalPower: totalPower.toLocaleString("cs-CZ") 
    };
}

export const PortfolioBreakdown = () => {
    const datacenters = useModelStore(state => state.datacenters)
    const breakdown = useMemo(() => getDcBreakdown(datacenters), [datacenters]);

    if (breakdown.totalCount === 0) {
        return (
            <Card className="border-slate-200/60 bg-linear-to-br from-slate-50/70 via-slate-50/30 to-indigo-50/15 shadow-xs p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="p-3 bg-white/80 border border-slate-100 text-slate-400 rounded-full mb-3 shadow-2xs">
                    <Database className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{staticTexts.emptyTitle}</h3>
                <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                    {staticTexts.emptyDescription}
                </p>
            </Card>
        )
    }

    return (
        <Card className="border-slate-200/60 bg-linear-to-br from-slate-50/70 via-slate-50/30 to-indigo-50/15 shadow-xs p-6 flex flex-col justify-between h-full min-h-[410px]">
            <div className="space-y-4">
                <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-white border border-indigo-100 text-indigo-600 shadow-2xs">
                            <Database className="h-4 w-4" />
                        </div>
                        {staticTexts.title}
                    </CardTitle>
                </CardHeader>

                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{staticTexts.totalItPower}</span>
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        {breakdown.formattedTotalPower}{" "}
                        <span className="text-sm font-medium text-slate-500">{staticTexts.unitItPower}</span>
                    </div>
                </div>

                {/* Stacked Proportional Progress Bar */}
                <div className="h-3 w-full rounded-full bg-slate-100/80 border border-slate-200/30 overflow-hidden flex shadow-2xs">
                    {breakdown.list.map((data) => {
                        if (data.percentage === 0) return null;
                        return (
                            <div
                                key={data.key}
                                className={`${data.color} transition-all duration-500`}
                                style={{ width: `${data.percentage}%` }}
                                title={`${data.label}: ${data.power} MW (${data.formattedPercentage}%)`}
                            />
                        );
                    })}
                </div>

                {/* List view of types */}
                <div className="divide-y divide-slate-100/50 pt-1">
                    {breakdown.list.map((data) => {
                        if (data.count === 0) return null;
                        return (
                            <div key={data.key} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-2.5">
                                    <span className={`h-2.5 w-2.5 rounded-full ${data.color} shrink-0 border border-white shadow-2xs`} />
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">{data.label}</p>
                                        <p className="text-[10px] text-slate-400">Podíl na výkonu: {data.formattedPercentage}%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-800">{data.formattedPower} MW</p>
                                    <p className="text-[10px] text-slate-400">počet: {data.count}×</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-100/50 pt-3 flex items-center gap-1 mt-4">
                <HelpCircle className="h-3.5 w-3.5" />
                {staticTexts.footerLegend}
            </div>
        </Card>
    );
};
