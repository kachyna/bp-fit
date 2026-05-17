import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InfoIcon } from "lucide-react"



export const CommonParameterInput = ({ label, description, value, onChange }) => (
    <Card>
        <CardContent>
            <div className="space-y-1.5">
                <HoverCard openDelay={50} closeDelay={50}>
                    <HoverCardTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer w-fit">
                            <Label className="text-xs text-slate-500">{label}</Label>
                            <InfoIcon className="size-3.5 text-slate-500" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" collisionPadding={16}>
                        <p>{description}</p>
                    </HoverCardContent>
                </HoverCard>

                <Input className="h-8 text-sm"
                    type="number"
                    value={value}
                    step="0.1"
                    // onChange={(e) => onChange("COMMON_PARAMS", "test", e.target.value)}
                    placeholder="0"
                />
            </div>
        </CardContent>
    </Card>
)