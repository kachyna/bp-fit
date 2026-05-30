import { YAxis } from "recharts"
import { useIsMobile } from "#hooks/use-mobile"

export const StyledYAxis = ({
  tickLine = false,
  axisLine = false,
  tick = { fill: "#64748b", fontSize: 10 },
  width = 80,
  hide,
  ...props
}) => {
  const isMobile = useIsMobile()

  return (
    <YAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tick={tick}
      width={width}
      hide={hide !== undefined ? hide : isMobile}
      {...props}
    />
  )
}

StyledYAxis.displayName = "YAxis"
