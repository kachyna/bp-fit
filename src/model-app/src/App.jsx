import './App.css'
import { useModelStore } from './store/useModelStore'
import { ConfigSidebar } from './components/ConfigSidebar'
import { analyzeDatacenters } from './logic/engine.js'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'
import { DebugView } from './components/debug-view'

function App() {

  const datacenters = useModelStore(state => state.datacenters)
  const analyzedData = analyzeDatacenters(datacenters)
  const params = useModelStore(state => state.params)
  

  return (
    <SidebarProvider>
      <ConfigSidebar />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="flex items-center h-14 px-4 border-b border-slate-200 bg-white">
          <SidebarTrigger />
          <h1 className="ml-4 text-lg font-semibold text-slate-800">Přehled metrik</h1>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-10">
          {/* Main Workspace where the charts and tabs will be */}
          
          <DebugView 
            params={params} 
            analyzedData={analyzedData} 
            datacenters={datacenters} 
          />

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
