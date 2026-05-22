import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const colorClasses = {
  amber: {
    card: "border-amber-100/50 bg-amber-50/50 hover:bg-amber-50",
    title: "text-amber-900",
    iconWrapper: "bg-amber-100 text-amber-600",
  },
  stone: {
    card: "border-stone-200/60 bg-stone-50/80 hover:bg-stone-50",
    title: "text-stone-800",
    iconWrapper: "bg-stone-200 text-stone-600",
  },
  cyan: {
    card: "border-cyan-100/50 bg-cyan-50/40 hover:bg-cyan-50/70",
    title: "text-cyan-900",
    iconWrapper: "bg-cyan-100 text-cyan-700",
  },
  emerald: {
    card: "border-emerald-100/50 bg-emerald-50/40 hover:bg-emerald-50/70",
    title: "text-emerald-900",
    iconWrapper: "bg-emerald-100 text-emerald-700",
  },
}

const getHoverCardClasses = (color) => {
  if (color === "stone") return colorClasses.stone
  if (color === "cyan") return colorClasses.cyan
  if (color === "emerald") return colorClasses.emerald
  return colorClasses.amber
}

export const ESGHoverCard = ({
  title,
  color,
  icon,
  children,
  hoverContent,
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
        {children}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden">
            {hoverContent}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
