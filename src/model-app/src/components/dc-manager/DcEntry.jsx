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
      <CardContent className="p-4 flex flex-col md:flex-row md:items-end gap-4">
        {/* Typ DC */}
        <div className="flex-1 space-y-2">
          <Label htmlFor={`type-${dc.id}`}>Typ datacentra</Label>
          <Select
            value={dc.type}
            onValueChange={(value) => updateDatacenter(dc.id, "type", value)}
          >
            <SelectTrigger id={`type-${dc.id}`} className="w-full">
              <SelectValue placeholder="Vyberte typ" />
            </SelectTrigger>
            <SelectContent>
              {dcTypes.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Příkon MW */}
        <div className="w-full md:w-32 space-y-2">
          <Label htmlFor={`itPower-${dc.id}`}>Příkon (MW)</Label>
          <Input
            id={`itPower-${dc.id}`}
            type="number"
            value={dc.itPower}
            onChange={(e) => updateDatacenter(dc.id, "itPower", e.target.value)}
            placeholder="0"
          />
        </div>

        {/* PUE */}
        <div className="w-full md:w-32 space-y-2">
          <Label htmlFor={`pue-${dc.id}`}>PUE</Label>
          <Input
            id={`pue-${dc.id}`}
            type="number"
            step="0.1"
            value={dc.pue}
            onChange={(e) => updateDatacenter(dc.id, "pue", e.target.value)}
            placeholder="1.5"
          />
        </div>

        <div>
          <Button
            variant="destructive"
            className="h-9 w-10 md:w-auto px-3"
            onClick={() => removeDatacenter(dc.id)}
            aria-label="Smazat"
            title="Smazat datacentrum"
          >
            <Trash2 size={18} className="md:mr-2" />
            <span className="hidden md:inline">Smazat</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
