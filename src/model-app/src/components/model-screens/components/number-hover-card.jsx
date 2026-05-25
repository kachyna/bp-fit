import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const colorClasses = {
  amber: {
    card: "border-amber-100/50 bg-amber-50/50 hover:bg-amber-50",
    title: "text-amber-900",
    iconWrapper: "bg-amber-100 text-amber-600",
    hoverContentBorder: "border-amber-200/70",
    hoverContentText: "text-amber-700",
  },
  stone: {
    card: "border-stone-200/60 bg-stone-50/80 hover:bg-stone-50",
    title: "text-stone-800",
    iconWrapper: "bg-stone-200 text-stone-600",
    hoverContentBorder: "border-stone-200/70",
    hoverContentText: "text-stone-700",
  },
  cyan: {
    card: "border-cyan-100/50 bg-cyan-50/40 hover:bg-cyan-50/70",
    title: "text-cyan-900",
    iconWrapper: "bg-cyan-100 text-cyan-700",
    hoverContentBorder: "border-cyan-200/70",
    hoverContentText: "text-cyan-700",
  },
  emerald: {
    card: "border-emerald-100/50 bg-emerald-50/40 hover:bg-emerald-50/70",
    title: "text-emerald-900",
    iconWrapper: "bg-emerald-100 text-emerald-700",
    hoverContentBorder: "border-emerald-200/70",
    hoverContentText: "text-emerald-700",
  },
  indigo: {
    card: "border-indigo-100/50 bg-indigo-50/40 hover:bg-indigo-50/70",
    title: "text-indigo-900",
    iconWrapper: "bg-indigo-100 text-indigo-700",
    hoverContentBorder: "border-indigo-200/70",
    hoverContentText: "text-indigo-700",
  },
  rose: {
    card: "border-rose-100/50 bg-rose-50/40 hover:bg-rose-50/70",
    title: "text-rose-900",
    iconWrapper: "bg-rose-100 text-rose-700",
    hoverContentBorder: "border-rose-200/70",
    hoverContentText: "text-rose-700",
  },
  blue: {
    card: "border-blue-100/50 bg-blue-50/40 hover:bg-blue-50/70",
    title: "text-blue-900",
    iconWrapper: "bg-blue-100 text-blue-700",
    hoverContentBorder: "border-blue-200/70",
    hoverContentText: "text-blue-700",
  },
  violet: {
    card: "border-violet-100/50 bg-violet-50/40 hover:bg-violet-50/70",
    title: "text-violet-900",
    iconWrapper: "bg-violet-100 text-violet-700",
    hoverContentBorder: "border-violet-200/70",
    hoverContentText: "text-violet-700",
  },
  orange: {
    card: "border-orange-100/50 bg-orange-50/40 hover:bg-orange-50/70",
    title: "text-orange-950",
    iconWrapper: "bg-orange-100 text-orange-700",
    hoverContentBorder: "border-orange-200/70",
    hoverContentText: "text-orange-700",
  },
  slate: {
    card: "border-slate-200/60 bg-slate-50/80 hover:bg-slate-50",
    title: "text-slate-800",
    iconWrapper: "bg-slate-200 text-slate-600",
    hoverContentBorder: "border-slate-200/70",
    hoverContentText: "text-slate-700",
  },
}

const getHoverCardClasses = (color) => {
  return colorClasses[color] || colorClasses.amber
}

export const NumberHoverCard = ({
  title,
  color,
  icon,
  mainText,
  comparisonHeader = "To je jako...",
  comparisons,
  children,
  expandOnRowHover = false
}) => {
  const classes = getHoverCardClasses(color)

  return (
    <Card className={`group transition-colors shadow-sm cursor-default ${classes.card}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${classes.title}`}>
          {title}
        </CardTitle>
        <div className={`p-1.5 rounded-md ${classes.iconWrapper}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {mainText}
        <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out opacity-0 ${expandOnRowHover
          ? "group-hover/row:grid-rows-[1fr] group-hover/row:opacity-100"
          : "group-hover:grid-rows-[1fr] group-hover:opacity-100"
          }`}>
          {(comparisons || children) && <div className={`overflow-hidden space-y-2 mt-2 pt-2 text-xs ${classes.hoverContentText}`}>
            <div className={`flex flex-col space-y-2 border-t ${comparisons ? 'border-b' : ''} pt-2 ${comparisons ? 'pb-2' : ''} ${classes.hoverContentBorder}`}>
              <h2 className={`text-sm font-medium ${classes.title}`}>{comparisonHeader}</h2>
              {comparisons}
            </div>
            {children}
          </div>} 
        </div>
      </CardContent>
    </Card>
  )
}
