import { useRef } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
} from "../ui/sidebar";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";

import { DcManager } from "@/components/dc-manager/dc-manager";
import { ParameterManager } from "@/components/parameter-manager/parameter-manager";
import { PortfolioManager } from "@/components/sample-portfolios/portfolio-manager";

export function ConfigSidebar() {
    const sidebarRef = useRef(null);

    const handlePortfolioSelect = () => {
        const scrollToTop = () => {
            if (sidebarRef.current) {
                sidebarRef.current.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            }
        };
        setTimeout(scrollToTop, 100);
    };

    return (
        <Sidebar className="border-r border-slate-200">
            <SidebarHeader className="p-4 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800">
                    Portfolio a parametry
                </h2>
            </SidebarHeader>
            <SidebarContent ref={sidebarRef} className="p-4">
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
                <Collapsible defaultOpen={true} className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger>
                            <div className="flex flex-row items-center space-between text-sm font-medium text-slate-900 group-data-[state=open]/collapsible:text-slate-600 group-data-[state=open]/collapsible:mb-4">
                                <span className="font-bold uppercase">Vzorová portfolia</span>
                                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-1 -mx-1 pt-1 -mt-1 pb-2 -mb-2">
                            <PortfolioManager onPortfolioSelect={handlePortfolioSelect} />
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
        </Sidebar>
    );
}