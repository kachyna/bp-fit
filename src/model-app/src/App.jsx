import './App.css'
import { ConfigSidebar } from './components/layout/ConfigSidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'
import { AnimatedDashboard } from '#components/layout/animated-dashboard'
import { Toaster } from '@/components/ui/sonner'
import { SelectScenario } from '#components/layout/select-scenario'
import { SettingsMenu } from '#components/layout/settings'

function App() {

  return (
    <SidebarProvider>
      <ConfigSidebar />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="flex items-center justify-between h-14 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold text-slate-800">Výstupy modelu</h1>
          </div>
          <div className="flex items-center gap-4 mr-2">
            <SelectScenario />
            <SettingsMenu />
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-10">
          <AnimatedDashboard />
          <Toaster />
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
