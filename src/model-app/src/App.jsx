import './App.css'
import { ConfigSidebar } from './components/ConfigSidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'
import { AnimatedDashboard } from '#components/animated-dashboard'
import { Toaster } from '@/components/ui/sonner'
import { useState } from 'react'
import { SelectScenario } from '#components/select-scenario'
import { SettingsMenu } from '#components/settings'

function App() {
  const [debug, setDebug] = useState(false)

  return (
    <SidebarProvider>
      <ConfigSidebar />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="flex items-center justify-between h-14 px-4 border-b border-slate-200 bg-white">
          <div className="flex items-center">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold text-slate-800">Přehled metrik</h1>
          </div>
          <div className="flex items-center gap-4 mr-2">
            <SelectScenario />
            <SettingsMenu debug={debug} onCheckboxChange={(checked) => setDebug(checked)} />
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-10">
          <AnimatedDashboard debug={debug} />
          <Toaster />
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
