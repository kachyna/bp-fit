import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { ESGHoverCard } from "@/components/model-screens/components/hover-card"
import { getEsgCopy } from "@/components/model-screens/texts/esg-texts"
import { ESGChart } from "./esg-chart"
import { ScreenHeader } from "../components/screen-header"

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
              <ESGHoverCard
                key={category}
                title={esgCopy[category].title}
                color={esgCopy[category].color}
                icon={esgCopy[category].icon}
                mainText={esgCopy[category].mainText}
                comparisonHeader={esgCopy[category].comparisonHeader}
                comparisons={esgCopy[category].comparisons}
              >
                {esgCopy[category].children}
              </ESGHoverCard>
            )
          })}
        </div>

        {/* PRAVÝ SLOUPEC: Informační panel a graf scénářů */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* KARTA s úvodním kontextem */}
          <Card className="border-emerald-100 bg-linear-to-br from-emerald-50/50 via-slate-50/30 to-indigo-50/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-md">
                  <HelpCircle className="h-4 w-4" />
                </div>
                {esgCopy.intro.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 leading-relaxed">
              {esgCopy.intro.children}
            </CardContent>
          </Card>

          {/* Graf scénářů */}
          <ESGChart data={data} chartCopy={esgCopy.chart} />
        </div>

      </div>
    </div>
  )
}