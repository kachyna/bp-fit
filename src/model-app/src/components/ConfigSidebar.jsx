import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
} from "./ui/sidebar";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

import { DcManager } from "./dc-manager/DcManager";
import { ParameterManager } from "./parameter-manager/ParameterManager";

export function ConfigSidebar() {
    return (
        <Sidebar className="border-r border-slate-200">
            <SidebarHeader className="p-4 border-b border-slate-100">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Model Výstavby
                </h1>
            </SidebarHeader>
            <SidebarContent className="p-4">
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger>
                            <div className="flex flex-row items-center space-between text-sm font-medium text-slate-900 group-data-[state=open]/collapsible:text-slate-600 group-data-[state=open]/collapsible:mb-4">
                                <span className="font-bold uppercase">Portfolio datových center</span>
                                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-1 -mx-1 pt-1 -mt-1 pb-2 -mb-2">
                            <DcManager />
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <Collapsible defaultOpen={false} className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger>
                            <div className="flex flex-row items-center space-between text-sm font-medium text-slate-900 group-data-[state=open]/collapsible:text-slate-600 group-data-[state=open]/collapsible:mb-4">
                                <span className="font-bold uppercase">Konfigurace parametrů</span>
                                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-1 -mx-1 pt-1 -mt-1 pb-2 -mb-2">
                            <ParameterManager />
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
        </Sidebar>
    );
}