import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

export function InfoLabel({ label, description, htmlFor="" }) {
    return (
        <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer w-fit">
                    <Label className="text-xs text-slate-500" htmlFor={htmlFor}>
                        {label}
                    </Label>
                    <InfoIcon className="size-3 text-slate-500" />
                </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" collisionPadding={16}>
                <p>{description}</p>
            </HoverCardContent>
        </HoverCard>
    )
}

