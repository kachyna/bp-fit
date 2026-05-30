import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUiStore } from "@/store/useUiStore"

export const ChartCard = ({
    title,
    description,
    icon,
    iconBgClass = "bg-indigo-100/70 text-indigo-700",
    cardClass = "border-indigo-100 bg-linear-to-br from-indigo-50/40 via-slate-50/20 to-rose-50/30",
    hoverExplanation,
    children
}) => {
    const expandAllCards = useUiStore(state => state.expandAllCards)

    const gridRowsClass = expandAllCards
        ? "grid grid-rows-[1fr] opacity-100"
        : "grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"

    return (
        <Card className={`shadow-sm transition-all duration-300 hover:shadow-md group cursor-default overflow-visible ${cardClass}`}>
            <CardHeader className="flex flex-col gap-1.5">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    {icon && (
                        <div className={`p-1.5 rounded-md shrink-0 ${iconBgClass}`}>
                            {icon}
                        </div>
                    )}
                    <span>{title}</span>
                </CardTitle>
                {description && (
                    <CardDescription className="text-slate-500 text-xs leading-normal">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="pb-6">
                {children}
                {hoverExplanation && (
                    <div className={gridRowsClass}>
                        <div className="overflow-hidden">
                            <div className="border-t border-dashed mt-4 pt-4 border-slate-200 text-xs text-slate-600 leading-relaxed">
                                {hoverExplanation}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

    )
}
