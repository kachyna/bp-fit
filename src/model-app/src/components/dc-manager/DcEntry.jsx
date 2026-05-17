import { Button } from "../ui/button";
import { InputField } from "../ui/labeled-field";
import { SelectDatacenter } from "../ui/select-component";
import { Card, CardContent } from "../ui/card";
import { Trash2 } from "lucide-react";

export const DcEntry = ({ dc, dcTypes, updateDatacenter, removeDatacenter }) => {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-4 flex flex-col md:flex-row md:items-end gap-4">
        {/* Typ DC */}
        <div className="flex-1">
          <SelectDatacenter
            label="Typ datacentra"
            name="Typ datacentra"
            placeholder="Vyberte typ"
            array={dcTypes}
            value={dc.type}
            onValueChange={(value) => updateDatacenter(dc.id, "type", value)}
            className="w-full"
          />
        </div>

        {/* Příkon MW */}
        <div className="w-full md:w-32">
          <InputField
            id={`itPower-${dc.id}`}
            label="Příkon (MW)"
            type="number"
            value={dc.itPower}
            onChange={(e) => updateDatacenter(dc.id, "itPower", e.target.value)}
            placeholder="0"
          />
        </div>

        {/* PUE */}
        <div className="w-full md:w-32">
          <InputField
            id={`pue-${dc.id}`}
            label="PUE"
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
