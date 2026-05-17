import { useModelStore } from "../../store/useModelStore";
import { Button } from "../ui/button"
import { DcEntry } from "./DcEntry";

export const DcManager = () => {
  const { datacenters, addDatacenter, removeDatacenter, updateDatacenter } = useModelStore();

  const dcTypes = [
    { id: 'coloc', label: 'Colocation' },
    { id: 'training', label: 'AI Training' },
    { id: 'inference', label: 'AI Inference' }
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Konfigurace portfolia</h2>
        <Button onClick={addDatacenter} variant="default">
          <span className="text-xl leading-none">+</span> Přidat DC
        </Button>
      </div>

      <div className="space-y-4 flex-col">
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
        <p className="text-center text-slate-400 py-10">Žádná datacentra nebyla přidána. Klikněte na +.</p>
      )}
    </div>
  );
};