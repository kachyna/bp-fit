import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronDown, InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useModelStore } from "@/store/useModelStore"
import { PARAM_DETAILS } from '@/constants/param-details'
import { PARAM_GROUPS } from '@/constants/param-groups'
import { Card, CardContent } from "@/components/ui/card"
import { CommonParameterInput } from "./common-parameter"
import { CategoryDropdown } from "@/components/parameter-manager/parameter-category-dropown"

const getScenarioParamValues = (scenario, paramKey) => {
    const { params } = useModelStore()

    const ret = {}

    Object.keys(params.SCENARIOS).forEach(scenario => {
        ret[scenario] = params.SCENARIOS[scenario][paramKey]
    })
    return ret
}

const getCommonParamInputHtml = (paramKey, paramLabel, paramDescription) => {
    return (<div className="space-y-1.5">
        <Label htmlFor={`common-${paramKey}`} className="text-xs text-slate-500">{paramLabel}</Label>
        <Input
            id={`common-${paramKey}`}
            type="number"
            step="0.1"
            value={params.COMMON_PARAMS[paramKey]}
            onChange={(e) => updateParameter("COMMON_PARAMS", paramKey, e.target.value)}
            placeholder="1.5"
            className="h-8 text-sm"
        />
    </div>
    )
}

export function ParameterManager() {

    const params = useModelStore((state) => state.params);
    const updateParameter = useModelStore((state) => state.updateParameter);

    const renderCommonParams = {
        paramLabel: b,
        paramDescription: c,
        paramType: c, //common, scenario
        paramValue: c,
    }

    Object.entries(PARAM_GROUPS).map(([key, paramGroup]) => {
        const groupLabel = paramGroup.label || key
        const groupDescription = paramGroup.description || ""
        const paramKeysArray = paramGroup.keys || []
    })

    const label = "Test"


    return (
        <div className="flex flex-col gap-2 w-full">
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
                <Alert>
                    <InfoIcon />
                    <AlertTitle className="text-sm">Scénářové parametry</AlertTitle>
                    <AlertDescription>
                        <span className="text-xs">Tyto hodnoty jsou odlišné pro každý scénář.</span><br />
                        <span className="text-xs">Vstupní pole odpovídají tomuto pořadí:</span><br />
                        <span className="text-xs font-semibold">PESIMISTICKÝ - REALISTICKÝ - OPTIMISTICKÝ.</span>
                    </AlertDescription>
                </Alert>
            </CategoryDropdown>

            <Collapsible defaultOpen className="group/collapsible">
                <CollapsibleTrigger>
                    <div className="flex flex-row items-center space-around text-sm font-medium text-slate-900 group-data-[state=open]/collapsible:text-slate-600 group-data-[state=open]/collapsible:mb-4">
                        <span className="font-semibold text-xs uppercase">Common parameters</span>
                        <ChevronDown className="ml-auto size-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>


                    <Card>
                        <CardContent>

                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-500">Scenarovy parametr</Label>
                                <div className="flex flex-row gap-2">
                                    <Input className="h-8 text-sm" />
                                    <Input className="h-8 text-sm" />
                                    <Input className="h-8 text-sm" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-500">Scenarovy parametr</Label>
                                <div className="flex flex-row gap-2">
                                    <div>
                                        <div>
                                            <Label className="text-xs text-slate-500">Pesimisticky</Label>
                                            <Input className="h-8 text-sm" />
                                            <Input className="h-8 text-sm" />
                                            <Input className="h-8 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs text-slate-500">Realisticky</Label>
                                        <Input className="h-8 text-sm" />
                                        <Input className="h-8 text-sm" />
                                        <Input className="h-8 text-sm" />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-slate-500">Optimisticky</Label>
                                        <Input className="h-8 text-sm" />
                                        <Input className="h-8 text-sm" />
                                        <Input className="h-8 text-sm" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}