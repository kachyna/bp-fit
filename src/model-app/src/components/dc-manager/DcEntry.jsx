import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Trash2 } from "lucide-react";

export const DcEntry = ({ dc, dcTypes, updateDatacenter, removeDatacenter }) => {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor={`type-${dc.id}`} className="text-xs text-slate-500">Typ datacentra</Label>
            <Select
              value={dc.type}
              onValueChange={(value) => updateDatacenter(dc.id, "type", value)}
            >
              <SelectTrigger id={`type-${dc.id}`} size="sm" className="w-31 text-sm">
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

          <div className="space-y-1.5 w-17">
            <Label htmlFor={`itPower-${dc.id}`} className="text-xs text-slate-500">IT Příkon</Label>
            <Input
              id={`itPower-${dc.id}`}
              type="number"
              value={dc.itPower === 0 ? "" : dc.itPower}
              min="1"
              max="999"
              onChange={(e) => updateDatacenter(dc.id, "itPower", e.target.value)}
              placeholder="0"
              className="h-8 text-sm px-2"
            />
          </div>

          {/* PUE */}
          <div className="space-y-1.5 w-17">
            <Label htmlFor={`pue-${dc.id}`} className="text-xs text-slate-500">PUE</Label>
            <Input
              id={`pue-${dc.id}`}
              type="number"
              min="1"
              step="0.1"
              value={dc.pue === 0 ? "" : dc.pue}
              onChange={(e) => updateDatacenter(dc.id, "pue", e.target.value)}
              placeholder="0"
              className="h-8 text-sm px-2"
            />
          </div>

          {/* Počet */}
          <div className="space-y-1.5 w-17">
            <Label htmlFor={`count-${dc.id}`} className="text-xs text-slate-500">Počet</Label>
            <Input
              id={`count-${dc.id}`}
              type="number"
              min="1"
              max="999"
              value={dc.count === 0 ? "" : dc.count}
              onChange={(e) => updateDatacenter(dc.id, "count", e.target.value)}
              placeholder="0"
              className="h-8 text-sm px-2 text-center"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/10 shrink-0"
            onClick={() => removeDatacenter(dc.id)}
            title="Smazat datacentrum"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
