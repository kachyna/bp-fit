import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function DebugView({ params, analyzedData, datacenters }) {
    const debugSections = [
        { title: "Model Parameters (Debug)", data: params },
        { title: "Summarized Data (Debug)", data: analyzedData },
        { title: "Live Data Store (Debug)", data: datacenters }
    ]

    return (
        <div className="space-y-6">
            {debugSections.map((section, index) => (
                <Collapsible key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group/collapsible">
                    <CollapsibleTrigger asChild>
                        <div className="flex w-full cursor-pointer items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                {section.title}
                            </h2>
                            <ChevronDown className="size-5 text-slate-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                        <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto">
                            {JSON.stringify(section.data, null, 2)}
                        </pre>
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    )
}
