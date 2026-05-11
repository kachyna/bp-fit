import { useModelStore } from "../store/useModelStore";

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
        <button 
          onClick={addDatacenter}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Přidat DC
        </button>
      </div>

      <div className="space-y-4 flex-col">
        {datacenters.map((dc) => (
          <div key={dc.id} className="grid grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
            
            {/* Typ DC */}
            <div className="col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Typ</label>
              <select 
                value={dc.type}
                onChange={(e) => updateDatacenter(dc.id, 'type', e.target.value)}
                className="w-full h-10 p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dcTypes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>

            {/* Příkon MW */}
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Příkon (MW)</label>
              <input 
                type="number"
                value={dc.itPower}
                onChange={(e) => updateDatacenter(dc.id, 'itPower', e.target.value)}
                className="w-full h-10 p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            {/* PUE */}
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">PUE</label>
              <input 
                type="number" 
                step="0.1"
                value={dc.pue}
                onChange={(e) => updateDatacenter(dc.id, 'pue', e.target.value)}
                className="w-full h-10 p-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1,5"
              />
            </div>

            {/* Smazat tlačítko */}
            <div className="col-span-2">
              <button 
                onClick={() => removeDatacenter(dc.id)}
                className="w-full p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>

      {datacenters.length === 0 && (
        <p className="text-center text-slate-400 py-10">Žádná datacentra nebyla přidána. Klikněte na +.</p>
      )}
    </div>
  );
};