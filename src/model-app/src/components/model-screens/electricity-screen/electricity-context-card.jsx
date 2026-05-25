import { useState } from "react"
import { Flame, Leaf, Battery } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const ElectricityContextCard = ({ contextCopy, className }) => {
    const [activeTab, setActiveTab] = useState(0)

    if (!contextCopy || !contextCopy.sections) return null

    const icons = [
        <Flame className="h-4 w-4 text-orange-500" />,
        <Leaf className="h-4 w-4 text-emerald-500" />,
        <Battery className="h-4 w-4 text-blue-500" />
    ]

    const tabStyles = [
        "border-orange-100 hover:bg-orange-50/40 text-orange-950",
        "border-emerald-100 hover:bg-emerald-50/40 text-emerald-950",
        "border-blue-100 hover:bg-blue-50/40 text-blue-950"
    ]

    const activeStyles = [
        "bg-orange-50 border-orange-200 text-orange-950 ring-1 ring-orange-100",
        "bg-emerald-50 border-emerald-200 text-emerald-950 ring-1 ring-emerald-100",
        "bg-blue-50 border-blue-200 text-blue-950 ring-1 ring-blue-100"
    ]

    const activeHeaderBg = [
        "bg-orange-100/70 text-orange-700",
        "bg-emerald-100/70 text-emerald-700",
        "bg-blue-100/70 text-blue-700"
    ]

    return (
        <Card className={`border-slate-200/80 bg-linear-to-br from-slate-50 via-white to-slate-50/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 ${className || ""}`}>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <div className={`p-1.5 rounded-md transition-colors duration-300 ${activeHeaderBg[activeTab]}`}>
                        {icons[activeTab]}
                    </div>
                    {contextCopy.title}
                </CardTitle>
                <CardDescription className="text-slate-500 pl-9">
                    Prozkoumejte technologické synergie a inovace, které pomáhají řešit vysokou energetickou spotřebu.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                    {contextCopy.sections.map((section, idx) => {
                        const isActive = activeTab === idx
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                    isActive ? activeStyles[idx] : "border-slate-100 bg-slate-50/50 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                <span className={`p-1 rounded-md ${isActive ? 'bg-white shadow-xs' : 'bg-slate-100'}`}>
                                    {icons[idx]}
                                </span>
                                <span className="line-clamp-2 leading-snug">{section.title}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/40 p-5 min-h-[140px] flex flex-col justify-center transition-all duration-300">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        {contextCopy.sections[activeTab].title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {contextCopy.sections[activeTab].text}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
