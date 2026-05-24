import { YAxis } from "recharts"

export const StyledYAxis = ({
  tickLine = false,
  axisLine = false,
  tick = { fill: "#64748b", fontSize: 10 },
  width = 100,
  ...props
}) => {
  return (
    <YAxis
      tickLine={tickLine}
      axisLine={axisLine}
      tick={tick}
      width={width}
      {...props}
    />
  )
}

StyledYAxis.displayName = "YAxis"
