
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
    const updateParameterByPath = useModelStore((state) => state.updateParameterByPath);

    const paramInputs = {}

    Object.entries(params.COMMON_PARAMS).forEach(([paramKey, paramValue]) => {
        paramInputs[paramKey] = {
            values: paramValue,
            category: PARAM_DETAILS[paramKey]?.category || "common",
            label: PARAM_DETAILS[paramKey]?.label || paramKey,
            description: PARAM_DETAILS[paramKey]?.description || "",
            path: ["COMMON_PARAMS", paramKey]
        }
    });

    // For each parameter in SCENARIOS...
    Object.entries(params.SCENARIOS).forEach(([scenarioKey, scenarioParamKeys]) => {

        // Take the corresponding parameter value
        Object.entries(scenarioParamKeys).forEach(([paramKey, paramValue]) => {
            // If the value is a number, we put it in the paramInputs object
            if (typeof paramValue === "number") {
                paramInputs[paramKey] = {
                    category: PARAM_DETAILS[paramKey]?.category || "scenario",
                    values: {},
                    label: PARAM_DETAILS[paramKey]?.label || paramKey,
                    description: PARAM_DETAILS[paramKey]?.description || "",
                }
                SCENARIO_KEYS.forEach(scenario => {
                    paramInputs[paramKey]["values"][scenario] = params.SCENARIOS[scenario][paramKey]
                })
            }

            // If it's not a number (dependent on DC type)
            else {
                // We split it into separate triades for each DC type
                Object.entries(params.SCENARIOS[scenarioKey][paramKey]).forEach(([dcType, _]) => {
                    paramInputs[`${paramKey}-${dcType}`] = {
                        dcType: dcType,
                        values: {},
                        category: PARAM_DETAILS[paramKey]?.category || "scenario",
                        label: `${PARAM_DETAILS[paramKey]?.label || paramKey} - ${PARAM_DETAILS[dcType]?.label || dcType}`,
                        description: PARAM_DETAILS[paramKey]?.description || "",
                        unmodifiedParamKey: paramKey
                    }
                    SCENARIO_KEYS.forEach(scenario => {
                        paramInputs[`${paramKey}-${dcType}`]["values"][scenario] = params.SCENARIOS[scenario][paramKey][dcType]
                    })
                })
            }
        })
    })

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

            <Alert className="mb-1shadow-sm border-slate-200">
                <InfoIcon />
                <AlertTitle className="text-sm">Scénářové parametry</AlertTitle>
                <AlertDescription>
                    <span className="text-xs">Některé hodnoty se liší podle scénáře.</span><br />
                    <span className="text-xs">Jejich vstupní pole odpovídají tomuto pořadí:</span><br />
                    <span className="text-xs font-semibold">PESIMISTICKÝ - REALISTICKÝ - OPTIMISTICKÝ.</span>
                </AlertDescription>
            </Alert>

            <ResetParamsDialog />

            {Object.entries(PARAM_DETAILS.categoryLabels).map(([categoryKey, categoryLabel]) => {

                const categoryParams = Object.entries(paramInputs).filter(([_, param]) => param.category === categoryKey)

                if (categoryParams.length === 0) return null;

                return (
                    <CategoryDropdown key={categoryKey} categoryName={categoryLabel}>
                        <div className="space-y-3">
                            {categoryParams.map(([paramKey, param]) => {
                                const paramDetails = PARAM_DETAILS[paramKey] || {}
                                const paramLabel = paramDetails.label || paramKey
                                const paramDescription = paramDetails.description || ""
                                const paramValue = param.values

                                if (typeof paramValue === "number") return (
                                    <CommonParameterInput
                                        key={paramKey}
                                        paramKey={paramKey}
                                        label={paramLabel}
                                        description={paramDescription}
                                        value={paramValue}
                                        onChange={(value) => updateParameterByPath(["COMMON_PARAMS", paramKey], Number(value))}
                                    />
                                )
                                else return (
                                    <ScenarioParameterInput
                                        key={paramKey}
                                        paramKey={paramKey}
                                        label={paramLabel}
                                        description={paramDescription}
                                        paramValues={paramValue}
                                        onChange={(value, scenario) => updateParameterByPath(
                                            param.dcType ? ["SCENARIOS", scenario, param.unmodifiedParamKey, param.dcType] :
                                                ["SCENARIOS", scenario, paramKey], Number(value))
                                        }
                                    />
                                )
                            })}
                        </div>
                    </CategoryDropdown>
                )
            })}
        </div>
    )
}