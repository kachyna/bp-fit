import { useModelStore } from "../../store/useModelStore";
import { Button } from "../ui/button"
import { DcTypesInfoDialog } from "./dc-info";
import { DcEntry } from "./DcEntry";
import { Plus } from "lucide-react";

export const DcManager = () => {
  const { datacenters, addDatacenter, removeDatacenter, updateDatacenter } = useModelStore();

  const dcTypes = [
    { id: 'coloc', label: 'Kolokační' },
    { id: 'training', label: 'AI trénovací' },
    { id: 'inference', label: 'AI inferenční' }
  ];

  return (
    <>
      <div className="flex flex-col gap-3">
        {datacenters.map((dc) => (
          <DcEntry
            key={dc.id}
            dc={dc}
            dcTypes={dcTypes}
            updateDatacenter={updateDatacenter}
            removeDatacenter={removeDatacenter}
          />
        ))}
      </div>

      {datacenters.length === 0 && (
        <div className="text-center text-slate-400 text-sm py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          Žádná datacentra v portfoliu.
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <DcTypesInfoDialog />
        <Button variant="outline" size="sm" className="text-xs gap-2" onClick={addDatacenter}>
          <Plus className="size-3.5" />
          Přidat
        </Button>
      </div>
    </>
  );
};