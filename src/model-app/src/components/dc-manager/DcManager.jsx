import { useModelStore } from "../../store/useModelStore";
import { Button } from "../ui/button"
import { DcEntry } from "./DcEntry";
import { Plus } from "lucide-react";

export const DcManager = () => {
  const { datacenters, addDatacenter, removeDatacenter, updateDatacenter } = useModelStore();

  const dcTypes = [
    { id: 'coloc', label: 'Colocation' },
    { id: 'training', label: 'AI Training' },
    { id: 'inference', label: 'AI Inference' }
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

      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={addDatacenter}>
          <Plus className="mr-2 h-4 w-4" />
          Přidat
        </Button>
      </div>
    </>
  );
};