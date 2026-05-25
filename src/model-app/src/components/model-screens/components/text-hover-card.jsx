import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUiStore } from "@/store/useUiStore"

const colorClasses = {
  blue: {
    card: "border-blue-100 bg-linear-to-br from-blue-50/40 via-slate-50/20 to-indigo-50/30 hover:border-blue-300/80",
    iconWrapper: "bg-blue-100 text-blue-600",
  },
  violet: {
    card: "border-violet-100 bg-linear-to-br from-violet-50/40 via-slate-50/20 to-fuchsia-50/30 hover:border-violet-300/80",
    iconWrapper: "bg-violet-100 text-violet-600",
  },
  emerald: {
    card: "border-emerald-100 bg-linear-to-br from-emerald-50/40 via-slate-50/20 to-cyan-50/30 hover:border-emerald-300/80",
    iconWrapper: "bg-emerald-100 text-emerald-600",
  },
  amber: {
    card: "border-amber-100 bg-linear-to-br from-amber-50/40 via-slate-50/20 to-orange-50/30 hover:border-amber-300/80",
    iconWrapper: "bg-amber-100 text-amber-600",
  },
  slate: {
    card: "border-slate-200 bg-linear-to-br from-slate-50/40 via-slate-50/20 to-slate-100/30 hover:border-slate-300/80",
    iconWrapper: "bg-slate-200 text-slate-600",
  },
}

const getHoverCardClasses = (color) => {
  return colorClasses[color] || colorClasses.blue
}

export const TextHoverCard = ({
  title,
  description,
  color = "blue",
  icon,
  children,
  hoverContent,
  className = ""
}) => {
  const classes = getHoverCardClasses(color)
  const expandAllCards = useUiStore(state => state.expandAllCards)

  const gridRowsClass = expandAllCards
    ? "grid grid-rows-[1fr] opacity-100 pl-9"
    : "grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 pl-9"

  return (
    <Card className={`group transition-all duration-300 shadow-sm cursor-default ${classes.card} ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
          {icon && (
            <div className={`p-1.5 rounded-md ${classes.iconWrapper}`}>
              {icon}
            </div>
          )}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-slate-500 pl-9 font-medium text-xs">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-sm text-slate-600 leading-relaxed pl-9">
          {children}
        </div>
        
        {hoverContent && (
          <div className={gridRowsClass}>
            <div className="overflow-hidden">
              <div className="border-t border-dashed mt-4 pt-4 border-slate-200 text-xs text-slate-600 space-y-3 leading-relaxed">
                {hoverContent}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
