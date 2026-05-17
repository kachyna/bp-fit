import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InfoLabel } from "@/components/ui/info-label"



export const CommonParameterInput = ({ paramKey, label, description, value, onChange }) => (
    <Card className="shadow-sm border-slate-200">
        <CardContent>
            <div className="space-y-1.5">
                <InfoLabel label={label} description={description} htmlFor={`common-${paramKey}`} />
                <Input className="h-8 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    id={`common-${paramKey}`}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0"
                />
            </div>
        </CardContent>
    </Card>
)