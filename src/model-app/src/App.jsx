import './App.css'
import { useModelStore } from './store/useModelStore'
import { ConfigSidebar } from './components/ConfigSidebar'
import { analyzeDatacenters } from './logic/engine.js'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DebugView } from './components/model-screens/debug-view'
import { AggregateModelScreen } from './components/model-screens/AggregateScreen'
import { EconomyModelScreen } from './components/model-screens/EconomyScreen'
import { ElectricityModelScreen } from './components/model-screens/ElectricityScreen'
import { SocialModelScreen } from './components/model-screens/SocialScreen'

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
          <Tabs defaultValue="aggregate" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-5 md:w-fit">
              <TabsTrigger value="aggregate">Agregovaný pohled</TabsTrigger>
              <TabsTrigger value="electricity">Elektřina</TabsTrigger>
              <TabsTrigger value="economy">Ekonomika</TabsTrigger>
              <TabsTrigger value="social">Ostatní dopady</TabsTrigger>
              <TabsTrigger value="debug">Debug data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aggregate">
              <AggregateModelScreen />
            </TabsContent>

            <TabsContent value="electricity">
              <ElectricityModelScreen />
            </TabsContent>

            <TabsContent value="economy">
              <EconomyModelScreen />
            </TabsContent>

            <TabsContent value="social">
              <SocialModelScreen />
            </TabsContent>

            <TabsContent value="debug">
              <DebugView 
                params={params} 
                analyzedData={analyzedData} 
                datacenters={datacenters} 
              />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
