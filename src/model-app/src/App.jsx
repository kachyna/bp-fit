import './App.css'
import { useState, useEffect } from 'react'
import { ConfigSidebar } from './components/layout/config-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from './components/ui/sidebar'
import { AnimatedDashboard } from '#components/layout/animated-dashboard'
import { Toaster } from '@/components/ui/sonner'
import { SelectScenario } from '#components/layout/select-scenario'
import { SettingsMenu } from '#components/layout/settings'

function SidebarTriggerWithTooltip() {
  const { isMobile, openMobile } = useSidebar()
  const [hasDismissed, setHasDismissed] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (isMobile && !openMobile && !hasDismissed) {
      setShowTooltip(true)
    } else {
      setShowTooltip(false)
    }
  }, [isMobile, openMobile, hasDismissed])

  const handleDismiss = () => {
    setHasDismissed(true)
  }

  return (
    <div className="relative flex items-center">
      <SidebarTrigger onClick={handleDismiss} />
      
      {showTooltip && (
        <div 
          onClick={handleDismiss}
          className="absolute top-[calc(100%+8px)] left-0 z-50 w-max max-w-[200px] cursor-pointer rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-50 shadow-md select-none"
        >
          {/* Arrow pointing up */}
          <div className="absolute -top-1 left-3.5 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-800" />
          
          <span className="relative z-10 block leading-tight">
            Klikni na mě a přidej další datová centra!
          </span>
        </div>
      )}
    </div>
  )
}

function App() {

  return (
    <SidebarProvider>
      <ConfigSidebar />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="flex items-center justify-between h-14 px-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            <SidebarTriggerWithTooltip />
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
