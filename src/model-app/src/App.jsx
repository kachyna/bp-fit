import './App.css'
import { useModelStore } from './store/useModelStore'
import { ConfigSidebar } from './components/ConfigSidebar'
import { analyzeDatacenters } from './logic/engine.js'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'

function App() {

  const datacenters = useModelStore(state => state.datacenters)
  const analyzedData = analyzeDatacenters(datacenters)
  

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
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Summarized Data (Debug)
            </h2>
            <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto">
              {JSON.stringify(analyzedData, null, 2)}
            </pre>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Live Data Store (Debug)
            </h2>
            <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto">
              {JSON.stringify(datacenters, null, 2)}
            </pre>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
