import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { NumberHoverCard } from "@/components/model-screens/components/number-hover-card"
import { getEsgCopy } from "@/components/model-screens/texts/esg-texts"
import { ESGChart } from "./esg-chart"
import { ScreenHeader } from "../components/screen-header"
import { TextHoverCard } from "../components/text-hover-card"

export const ESGModelScreen = ({ data, activeScenario = "REALISTIC" }) => {
  const esgCopy = getEsgCopy(data[activeScenario])

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Dashboard Header */}
      <ScreenHeader
        title="Udržitelnost a ESG dopady"
        subtitle="Vyhodnocení uhlíkové stopy (Scope 2), spotřeby vody pro chlazení, záboru půdy a lokálního NIMBY efektu."
        analyzedData={data}
        pulseColor="bg-emerald-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">

          {['nimby', 'emissions', 'water', 'land'].map((category) => {
            return (
              <NumberHoverCard
                key={category}
                title={esgCopy[category].title}
                color={esgCopy[category].color}
                icon={esgCopy[category].icon}
                mainText={esgCopy[category].mainText}
                comparisonHeader={esgCopy[category].comparisonHeader}
                comparisons={esgCopy[category].comparisons}
              >
                {esgCopy[category].children}
              </NumberHoverCard>
            )
          })}
        </div>

        {/* PRAVÝ SLOUPEC: Informační panel a graf scénářů */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          <TextHoverCard
            title={esgCopy.intro.title}
            description={esgCopy.intro.description}
            color="emerald"
            icon={<HelpCircle className="h-4 w-4" />}
          >
            {esgCopy.intro.children}
          </TextHoverCard>

          {/* Graf scénářů */}
          <ESGChart data={data} chartCopy={esgCopy.chart} />
        </div>

      </div>
    </div>
  )
}