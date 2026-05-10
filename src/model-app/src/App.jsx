import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useModelStore } from './store/useModelStore'
import { DcManager } from './components/DcManager'

function App() {

  const datacenters = useModelStore(state => state.datacenters)
  

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Model vystavby datacenter</h1>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        <section>
          <DcManager />
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
    </div>
  )
}

export default App
