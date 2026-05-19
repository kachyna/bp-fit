import { Zap, Users, Banknote, Landmark, Factory, Droplets } from "lucide-react";

export const DcOverview = ({ dc }) => {
  return (
    <div className="flex flex-col gap-1.5 text-slate-600">
      {/* ENERGIE A EKOLOGIE */}
      <p className="text-xs pl-3 font-medium text-slate-600">Údaje pro jedno DC v zadaném klastru:</p>
      <div className="flex justify-between items-center bg-amber-50/50 border border-amber-100/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-amber-100 text-amber-600 rounded-md">
            <Zap size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Roční spotřeba:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.floor(dc.REALISTIC.realEnergyConsumption / 1000) / 1000} TWh</span>
      </div>

      <div className="flex justify-between items-center bg-cyan-50/50 border border-cyan-100/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-cyan-100 text-cyan-600 rounded-md">
            <Droplets size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Spotřeba vody:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.floor(dc.REALISTIC.waterConsumptionLiters / 1000)} tis. l</span>
      </div>

      <div className="flex justify-between items-center bg-stone-50 border border-stone-200/60 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-stone-200 text-stone-600 rounded-md">
            <Factory size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Emise CO₂:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.ceil(dc.REALISTIC.emissionsTonnesCO2)} t</span>
      </div>

      {/* EKONOMIKA A SPOLEČNOST */}
      <div className="flex justify-between items-center bg-blue-50/50 border border-blue-100/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 text-blue-600 rounded-md">
            <Users size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Zaměstnanci v prov.:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.ceil(dc.REALISTIC.fteOperations)}</span>
      </div>

      <div className="flex justify-between items-center bg-emerald-50/50 border border-emerald-100/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-emerald-100 text-emerald-600 rounded-md">
            <Banknote size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Roční HPH:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.ceil(dc.REALISTIC.yearlyOperationsGva / 1000 ) / 1000 } mil. Kč</span>
      </div>

      <div className="flex justify-between items-center bg-violet-50/50 border border-violet-100/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-violet-100 text-violet-600 rounded-md">
            <Landmark size={14} />
          </div>
          <span className="text-xs font-medium text-slate-600">Celková investice:</span>
        </div>
        <span className="font-semibold text-slate-800 text-xs">{Math.ceil(dc.REALISTIC.totalInvestment / 1000000 ) / 1000 } mld. Kč</span>
      </div>
    </div>
  );
};