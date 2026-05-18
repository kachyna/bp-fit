import './App.css'
import { ConfigSidebar } from './components/ConfigSidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'
import { AnimatedDashboard } from '#components/animated-dashboard'

function App() {  

  return (
    <SidebarProvider>
      <ConfigSidebar />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="flex items-center h-14 px-4 border-b border-slate-200 bg-white">
          <SidebarTrigger />
          <h1 className="ml-4 text-lg font-semibold text-slate-800">Přehled metrik</h1>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-10">
          <AnimatedDashboard />
        </main>
        
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
