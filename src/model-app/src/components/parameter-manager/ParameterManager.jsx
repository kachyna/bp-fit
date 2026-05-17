
import { InfoIcon, RefreshCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useModelStore } from "@/store/useModelStore"
import { SCENARIO_KEYS } from "@/constants/config"
import { PARAM_DETAILS } from '@/constants/param-details'
import { CategoryDropdown } from "@/components/parameter-manager/parameter-category-dropown"
import { CommonParameterInput } from "./common-parameter"
import { ScenarioParameterInput } from "./scenario-parameter"
import { ResetParamsDialog } from "./reset-params-dialog"

export function ParameterManager() {

    const params = useModelStore((state) => state.params);
    const updateParameter = useModelStore((state) => state.updateParameter);

    const scenarioParamKeys = new Set()

    SCENARIO_KEYS.forEach(scenario => {
        const scenarioParams = params.SCENARIOS[scenario] || {}
        Object.keys(scenarioParams).forEach(paramKey => {
            const value = scenarioParams[paramKey]

            // Scenario and datacenter type specific parameters will be in another category, so we want to filter them out
            if (typeof value === "number") {
                scenarioParamKeys.add(paramKey)
            }
        })
    })
    
    return (
        <div className="flex flex-col gap-2 w-full">

            <ResetParamsDialog />

            <CategoryDropdown categoryName="Společné parametry">
                <div className="space-y-3">
                    {Object.entries(params.COMMON_PARAMS).map(([paramKey, paramValue]) => {
                        if (paramKey === "scenarioProbabilities") return null;

                        const paramDetails = PARAM_DETAILS[paramKey] || {}
                        const paramLabel = paramDetails.label || paramKey
                        const paramDescription = paramDetails.description || ""

                        return (
                            <CommonParameterInput
                                key={paramKey}
                                paramKey={paramKey}
                                label={paramLabel}
                                description={paramDescription}
                                value={paramValue}
                                onChange={(value) => updateParameter("COMMON_PARAMS", paramKey, Number(value))}
                            />
                        )
                    })}
                </div>
            </CategoryDropdown>

            <CategoryDropdown categoryName="Scénářové parametry">
                <Alert className="mb-3 shadow-sm border-slate-200">
                    <InfoIcon />
                    <AlertTitle className="text-sm">Scénářové parametry</AlertTitle>
                    <AlertDescription>
                        <span className="text-xs">Tyto hodnoty jsou odlišné pro každý scénář.</span><br />
                        <span className="text-xs">Vstupní pole odpovídají tomuto pořadí:</span><br />
                        <span className="text-xs font-semibold">PESIMISTICKÝ - REALISTICKÝ - OPTIMISTICKÝ.</span>
                    </AlertDescription>
                </Alert>

                <div className="space-y-3">
                    {Array.from(scenarioParamKeys).map(paramKey => {
                        
                        const paramDetails = PARAM_DETAILS[paramKey] || {}
                        const paramLabel = paramDetails.label || paramKey
                        const paramDescription = paramDetails.description || ""
                        const values = Object.fromEntries(
                            SCENARIO_KEYS.map(scenario => [
                                scenario,
                                params.SCENARIOS[scenario][paramKey]
                            ])
                        );

                        return (
                            <ScenarioParameterInput
                                key={paramKey}
                                paramKey={paramKey}
                                label={paramLabel}
                                description={paramDescription}
                                paramValues={values}
                                onChange={(value, scenario) => updateParameter(scenario, paramKey, Number(value))}
                            />
                        )
                    })}
                </div>
            </CategoryDropdown>
        </div>
    )
}