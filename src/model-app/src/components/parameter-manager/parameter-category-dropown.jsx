import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function CategoryDropdown( {categoryName, children} ) {
    return (
        <Collapsible defaultOpen={false}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between text-sm font-medium text-slate-900 data-[state=open]:text-slate-600 data-[state=open]:mb-4 mb-2">
                <span className="font-semibold text-xs uppercase">{categoryName}</span>
                <ChevronDown className="size-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}