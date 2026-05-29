import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUiStore } from "@/store/useUiStore"

const themeStyles = {
    electricity: {
        activeStyles: [
            "bg-orange-50 border-orange-200 text-orange-950 ring-1 ring-orange-100",
            "bg-emerald-50 border-emerald-200 text-emerald-950 ring-1 ring-emerald-100",
            "bg-blue-50 border-blue-200 text-blue-950 ring-1 ring-blue-100"
        ],
        activeHeaderBg: [
            "bg-orange-100/70 text-orange-700",
            "bg-emerald-100/70 text-emerald-700",
            "bg-blue-100/70 text-blue-700"
        ]
    },
    economy: {
        activeStyles: [
            "bg-blue-50 border-blue-200 text-blue-950 ring-1 ring-blue-100",
            "bg-emerald-50 border-emerald-200 text-emerald-950 ring-1 ring-emerald-100",
            "bg-indigo-50 border-indigo-200 text-indigo-950 ring-1 ring-indigo-100"
        ],
        activeHeaderBg: [
            "bg-blue-100/70 text-blue-700",
            "bg-emerald-100/70 text-emerald-700",
            "bg-indigo-100/70 text-indigo-700"
        ]
    }
}

export const TabbedContextCard = ({ 
    contextCopy, 
    className = "", 
    theme = "electricity",
    textContainerClassName = "rounded-xl border border-slate-100 bg-slate-50/40 p-5 min-h-[140px] flex flex-col justify-center transition-all duration-300",
    hasHoverExpand = false,
    size = "default",
    headerClassName = "pb-4",
    contentClassName = "px-6 pb-6",
    tabsGridClassName = "grid grid-cols-1 md:grid-cols-3 gap-4 mb-5",
    buttonClassName = "p-3"
}) => {
    const [activeTab, setActiveTab] = useState(0)
    const expandAllCards = useUiStore(state => state.expandAllCards)

    if (!contextCopy || !contextCopy.sections) return null

    const themeConfig = themeStyles[theme] || themeStyles.electricity
    const activeStyles = themeConfig.activeStyles
    const activeHeaderBg = themeConfig.activeHeaderBg

    const sections = contextCopy.sections
    const currentSection = sections[activeTab]

    const finalContainerClass = `${textContainerClassName} ${expandAllCards ? "!max-h-none max-h-none!" : ""}`

    return (
        <Card size={size} className={`border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-slate-50/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 ${hasHoverExpand ? 'group/context' : ''} ${className}`}>
            <CardHeader className={headerClassName}>
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    {currentSection.icon && (
                        <div className={`p-1.5 rounded-md transition-colors duration-300 ${activeHeaderBg[activeTab] || activeHeaderBg[0]}`}>
                            {currentSection.icon}
                        </div>
                    )}
                    {contextCopy.title}
                </CardTitle>
                {contextCopy.description && (
                    <CardDescription className="text-slate-500 pl-9 font-medium text-xs">
                        {contextCopy.description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className={contentClassName}>
                <div className={tabsGridClassName}>
                    {sections.map((section, idx) => {
                        const isActive = activeTab === idx
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`flex items-center gap-2.5 rounded-lg border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${buttonClassName} ${
                                    isActive ? (activeStyles[idx] || activeStyles[0]) : "border-slate-100 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {section.icon && (
                                    <span className={`p-1 rounded-md ${isActive ? 'bg-white shadow-xs' : 'bg-slate-100'}`}>
                                        {section.icon}
                                    </span>
                                )}
                                <span className="line-clamp-2 leading-snug">{section.title}</span>
                            </button>
                        )
                    })}
                </div>

                <div className={finalContainerClass}>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5 shrink-0">
                        {currentSection.title}
                    </h4>
                    <div className="text-sm text-slate-600 leading-relaxed font-normal">
                        {currentSection.text}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
