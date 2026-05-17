import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "./ui/sidebar";
import { DcManager } from "./dc-manager/DcManager";

export function ConfigSidebar() {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-4 border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Model Výstavby
        </h1>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <DcManager />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}