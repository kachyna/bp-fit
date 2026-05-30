import { useState } from "react"
import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AggregateModelScreen } from "@/components/model-screens/aggregate-screen/aggregate-screen"
import { EconomyModelScreen } from "@/components/model-screens/economy-screen/economy-screen"
import { ElectricityModelScreen } from "@/components/model-screens/electricity-screen/electricity-screen"
import { ESGModelScreen } from "@/components/model-screens/esg-screen/esg-screen"
import { DebugView } from "@/components/model-screens/debug-view"
import { useModelStore } from "@/store/useModelStore"
import { useUiStore } from "@/store/useUiStore"
import { analyzeDatacenters } from "@/logic/engine"

const TAB_ORDER = ["aggregate", "electricity", "economy", "social", "debug"]

export function AnimatedDashboard() {

  const datacenters = useModelStore(state => state.datacenters)
  const params = useModelStore(state => state.params)

  const showDebug = useUiStore(state => state.showDebugCard)

  const analyzedData = useMemo(() => {
    return analyzeDatacenters(datacenters)
  }, [datacenters])

  const scenario = useModelStore(state => state.activeScenarioKey)

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
      <div className="w-full overflow-x-auto no-scrollbar mb-6 rounded-lg">
        <div className="flex justify-start md:justify-center min-w-full">
          <TabsList className="shrink-0 w-max">
            <TabsTrigger value="aggregate">Přehled</TabsTrigger>
            <TabsTrigger value="electricity">Elektřina</TabsTrigger>
            <TabsTrigger value="economy">Ekonomika</TabsTrigger>
            <TabsTrigger value="social">Udržitelnost / ESG</TabsTrigger>
            {showDebug && <TabsTrigger value="debug">Debug</TabsTrigger>}
          </TabsList>
        </div>
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
            {activeTab === "aggregate" && <AggregateModelScreen data={analyzedData} activeScenario={scenario} />}
            {activeTab === "electricity" && <ElectricityModelScreen data={analyzedData} activeScenario={scenario} />}
            {activeTab === "economy" && <EconomyModelScreen data={analyzedData} activeScenario={scenario} />}
            {activeTab === "social" && <ESGModelScreen data={analyzedData} activeScenario={scenario} />}
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