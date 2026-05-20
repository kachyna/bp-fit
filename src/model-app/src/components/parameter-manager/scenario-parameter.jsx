import { Card, CardContent } from "@/components/ui/card"
import { InfoLabel } from "@/components/ui/info-label"
import { BufferedInput } from "@/components/ui/buffered-input"

export const ScenarioParameterInput = ({ paramKey, label, description, paramValues, onChange }) => (
    <Card className="shadow-sm border-slate-200">
        <CardContent>
            <div className="space-y-1.5">
                <InfoLabel label={label} description={description} />

                <div className="flex flex-row gap-2">
                    {Object.entries(paramValues).map(([scenario, value]) => (
                    <BufferedInput key={scenario} className="h-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        id={`${scenario}-${paramKey}`}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(e, scenario)}
                        placeholder="0"
                    />
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)