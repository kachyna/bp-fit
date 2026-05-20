import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useModelStore } from "@/store/useModelStore"

const scenarioStyles = {
    PESIMISTIC: "decoration-rose-400 hover:decoration-rose-500",
    REALISTIC: "decoration-amber-400 hover:decoration-amber-500",
    OPTIMISTIC: "decoration-emerald-400 hover:decoration-emerald-500",
  };

export const SelectScenario = () => {

    const activeScenarioKey = useModelStore(state => state.activeScenarioKey)
    const setActiveScenario = useModelStore(state => state.setActiveScenario)

    return (
        <Select value={activeScenarioKey} onValueChange={setActiveScenario}>
            <SelectTrigger className={`select-none w-auto border-0 bg-transparent shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent outline-none p-0 h-auto text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900 hover:bg-transparent [&>svg]:ml-1.5 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-slate-400 transition-colors ${scenarioStyles[activeScenarioKey]}`}>
                <SelectValue placeholder="Vyberte scénář" />
            </SelectTrigger>
            <SelectContent align="end">
                <SelectItem value="PESIMISTIC">Pesimistický</SelectItem>
                <SelectItem value="REALISTIC">Realistický</SelectItem>
                <SelectItem value="OPTIMISTIC">Optimistický</SelectItem>
            </SelectContent>
        </Select>
    )

}

