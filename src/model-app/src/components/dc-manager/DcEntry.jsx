import React, { useState } from "react";
import { Button } from "../ui/button";
import { BufferedInput } from "@/components/ui/buffered-input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Trash2, Maximize2, Minimize2} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { DcOverview } from "./dc-overview";

export const DcEntry = ({ dc, dcTypes, updateDatacenter, removeDatacenter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="flex flex-col gap-3 px-3">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex flex-col gap-3 w-full"
        >
          {/* První řádek: Typ datacentra a ovládací tlačítka */}
          <div className="flex items-end gap-2 justify-between">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor={`type-${dc.id}`} className="text-xs text-slate-500">Typ datacentra</Label>
              <Select
                value={dc.type}
                onValueChange={(value) => updateDatacenter(dc.id, "type", value)}
              >
                <SelectTrigger id={`type-${dc.id}`} size="sm" className="w-full text-sm">
                  <SelectValue placeholder="Vyberte typ" />
                </SelectTrigger>
                <SelectContent>
                  {dcTypes.map((t) => (
                    <SelectItem key={t.id} value={t.id} className="text-sm">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost_confirm"
                  size="icon"
                  className="h-8 w-8 text-slate-400 shrink-0"
                  title={isOpen ? "Skrýt detaily" : "Zobrazit detaily"}
                >
                  {isOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </Button>
              </CollapsibleTrigger>
              <Button
                variant="ghost_destructive"
                size="icon"
                className="h-8 w-8 text-slate-400 shrink-0"
                onClick={() => removeDatacenter(dc.id)}
                title="Smazat datacentrum"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          {/* Druhý řádek: Číselné parametry */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor={`itPower-${dc.id}`} className="text-xs text-slate-500">IT Příkon</Label>
              <BufferedInput
                id={`itPower-${dc.id}`}
                type="number"
                value={dc.itPower}
                min="1"
                max="999"
                onChange={(e) => updateDatacenter(dc.id, "itPower", e)}
                placeholder="0"
                className="h-8 text-sm px-2 text-center"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`pue-${dc.id}`} className="text-xs text-slate-500">PUE</Label>
              <BufferedInput
                id={`pue-${dc.id}`}
                type="number"
                min="1"
                step="0.1"
                value={dc.pue}
                onChange={(e) => updateDatacenter(dc.id, "pue", e)}
                placeholder="0"
                className="h-8 text-sm px-2 text-center"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`count-${dc.id}`} className="text-xs text-slate-500">Počet</Label>
              <BufferedInput
                id={`count-${dc.id}`}
                type="number"
                min="1"
                max="999"
                value={dc.count}
                onChange={(e) => updateDatacenter(dc.id, "count", e)}
                placeholder="0"
                className="h-8 text-sm px-2 text-center"
              />
            </div>
          </div>

          {/* Rozbalovací část: Vypočítané informace */}
          <CollapsibleContent className="pt-3 mt-1 border-t border-slate-100 overflow-hidden text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <DcOverview dc={dc} />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
