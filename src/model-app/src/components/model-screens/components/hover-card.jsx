import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ESGHoverCard = ({
  className = "",
  title,
  titleClassName = "",
  icon,
  iconWrapperClassName = "",
  children,
  hoverContent,
}) => {
  return (
    <Card className={`group transition-colors shadow-sm cursor-default ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${titleClassName}`}>
          {title}
        </CardTitle>
        <div className={`p-1.5 rounded-md ${iconWrapperClassName}`}>
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
