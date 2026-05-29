import { Zap, Users, Banknote, Landmark, Factory, Droplets } from "lucide-react";
import { formatData } from "@/components/model-screens/texts/textutils";
import { useModelStore } from "@/store/useModelStore";

/**
 * Returns an array of overview items for a given DC data object.
 * Serves as source of truth for generating dc-overview cards. 
 */
const getOverviewItems = (data) => [
  {
    key: "consumption",
    label: "Roční spotřeba:",
    value: formatData(data.realEnergyConsumption, 0, "MWh"),
    icon: <Zap size={14} />,
    iconClass: "bg-amber-100 text-amber-600",
    cardClass: "bg-amber-50/50 border border-amber-100/50",
  },
  {
    key: "water",
    label: "Spotřeba vody:",
    value: formatData(data.waterConsumptionLiters, 0, "mil. l"),
    icon: <Droplets size={14} />,
    iconClass: "bg-cyan-100 text-cyan-600",
    cardClass: "bg-cyan-50/50 border border-cyan-100/50",
  },
  {
    key: "emissions",
    label: "Emise CO₂:",
    value: formatData(data.emissionsTonnesCO2, 0, "t"),
    icon: <Factory size={14} />,
    iconClass: "bg-stone-200 text-stone-600",
    cardClass: "bg-stone-50 border border-stone-200/60",
  },
  {
    key: "fte",
    label: "Zaměstnanci v prov.:",
    value: formatData(data.fteOperations, 0, "").trim(),
    icon: <Users size={14} />,
    iconClass: "bg-blue-100 text-blue-600",
    cardClass: "bg-blue-50/50 border border-blue-100/50",
  },
  {
    key: "gva",
    label: "Roční HPH:",
    value: formatData(data.yearlyOperationsGva, 2, "mil. Kč"),
    icon: <Banknote size={14} />,
    iconClass: "bg-emerald-100 text-emerald-600",
    cardClass: "bg-emerald-50/50 border border-emerald-100/50",
  },
  {
    key: "investment",
    label: "Celková investice:",
    value: formatData(data.totalInvestment, 2, "mld. Kč"),
    icon: <Landmark size={14} />,
    iconClass: "bg-violet-100 text-violet-600",
    cardClass: "bg-violet-50/50 border border-violet-100/50",
  },
];

export const DcOverview = ({ dc }) => {
  if (!dc) return null;

  // Get the curent scenario...
  const activeScenarioKey = useModelStore(state => state.activeScenarioKey);

  //...and get the overview data for it
  const items = getOverviewItems(dc[activeScenarioKey]);

  return (
    <div className="flex flex-col gap-1.5 text-slate-600">
      <p className="text-xs pl-3 font-medium text-slate-600">Údaje pro jedno DC v zadaném klastru:</p>
      {items.map((item) => (
        <div key={item.key} className={`flex justify-between items-center p-2 rounded-md ${item.cardClass}`}>
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-md ${item.iconClass}`}>
              {item.icon}
            </div>
            <span className="text-xs font-medium text-slate-600">{item.label}</span>
          </div>
          <span className="font-semibold text-slate-800 text-xs">{item.value}</span>
        </div>
      ))}
    </div>
  );
};