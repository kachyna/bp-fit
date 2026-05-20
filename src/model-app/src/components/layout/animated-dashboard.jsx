import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AggregateModelScreen } from "../model-screens/AggregateScreen"
import { EconomyModelScreen } from "../model-screens/EconomyScreen"
import { ElectricityModelScreen } from "../model-screens/ElectricityScreen"
import { SocialModelScreen } from "../model-screens/SocialScreen"
import { DebugView } from "../model-screens/debug-view"
import { useModelStore } from "@/store/useModelStore"
import { analyzeDatacenters } from "@/logic/engine"

const TAB_ORDER = ["aggregate", "electricity", "economy", "social", "debug"]

export function AnimatedDashboard({ debug }) {

  const datacenters = useModelStore(state => state.datacenters)
  const analyzedData = analyzeDatacenters(datacenters)
  const params = useModelStore(state => state.params)

  const [activeTab, setActiveTab] = useState("aggregate")
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left

  const handleTabChange = (newTab) => {
    const currentIndex = TAB_ORDER.indexOf(activeTab)
    const nextIndex = TAB_ORDER.indexOf(newTab)
    
    // Decide the diretion of the animation based on the index of the current and next tab
    setDirection(nextIndex > currentIndex ? 1 : -1)
    setActiveTab(newTab)
  }

  // Animation slide settings
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    }),
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-center w-full mb-6">
        <TabsList className={`grid w-full ${debug ? 'grid-cols-5' : 'grid-cols-4'} md:w-fit`}>
          <TabsTrigger value="aggregate">Přehled</TabsTrigger>
          <TabsTrigger value="electricity">Elektřina</TabsTrigger>
          <TabsTrigger value="economy">Ekonomika</TabsTrigger>
          <TabsTrigger value="social">Udržitelnost / ESG</TabsTrigger>
          {debug && <TabsTrigger value="debug">Debug</TabsTrigger>}
        </TabsList>
      </div>
      
      {/* Motion.div container controls the animation */}
      {/* Obal má padding a negativní margin, aby overflow-hidden neořezával drop-shadows a borders na okrajích karet */}
      <div className="overflow-hidden relative w-full p-2 -mx-2">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* Manually re-render the active screen based on the active tab */}
            {activeTab === "aggregate" && <AggregateModelScreen />}
            {activeTab === "electricity" && <ElectricityModelScreen />}
            {activeTab === "economy" && <EconomyModelScreen />}
            {activeTab === "social" && <SocialModelScreen />}
            {activeTab === "debug" && (
              <DebugView 
                params={params} 
                analyzedData={analyzedData} 
                datacenters={datacenters} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Tabs>
  )
}