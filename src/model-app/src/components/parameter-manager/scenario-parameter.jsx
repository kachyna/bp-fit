import { Card, CardContent } from "@/components/ui/card"
import { InfoLabel } from "@/components/ui/info-label"
import { BufferedInput } from "@/components/ui/buffered-input"
import { SCENARIO_LABELS } from "@/constants/config"
import { useIsMobile } from "#hooks/use-mobile"

export const ScenarioParameterInput = ({ paramKey, label, description, paramValues, onChange }) => {
    const isMobile = useIsMobile()

    return (

        <Card className="shadow-sm border-slate-200">
            <CardContent>
                <div className="space-y-1.5">
                    <InfoLabel label={label} description={description} />

                    <div className="flex flex-col sm:flex-row gap-2">
                        {Object.entries(paramValues).map(([scenario, value]) => (
                            <div key={scenario} className={isMobile ? "grid grid-cols-5 items-center" : ""}>
                                {isMobile && <p className="text-xs text-muted-foreground col-span-2">{SCENARIO_LABELS[scenario]}:</p>}
                                <BufferedInput className="col-span-3 h-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    id={`${scenario}-${paramKey}`}
                                    type="number"
                                    value={value}
                                    onChange={(e) => onChange(e, scenario)}
                                    placeholder="0"
                                    validate={(value) => {
                                        if (value < 0) return 0;
                                        return value;
                                    }}
                                    error="Parametr musí být vyšší nebo roven 0."
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}