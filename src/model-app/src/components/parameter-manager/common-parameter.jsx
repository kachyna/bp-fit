import { Card, CardContent } from "@/components/ui/card"
import { BufferedInput } from "@/components/ui/buffered-input"
import { InfoLabel } from "@/components/ui/info-label"

export const CommonParameterInput = ({ paramKey, label, description, value, onChange }) => (
    <Card className="shadow-sm border-slate-200">
        <CardContent>
            <div className="space-y-1.5">
                <InfoLabel label={label} description={description} htmlFor={`common-${paramKey}`} />
                <BufferedInput className="h-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    id={`common-${paramKey}`}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e)}
                    placeholder="0"
                />
            </div>
        </CardContent>
    </Card>
)
