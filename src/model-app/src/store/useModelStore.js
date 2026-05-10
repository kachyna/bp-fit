import { create } from 'zustand'
import { SCENARIOS, COMMON_PARAMS } from '../constants/parameters'

// set, get jsou dependency injection ze Zustand. ta definovana arrow funkce vraci objekt -- stejny zapis, jako bychom psali => { return { activeScearioKey: ...}}
export const useModelStore = create((set, get) => ({
    activeScenarioKey: 'REALISTIC',

    setActiveScenario: (newScenarioKey) => set({ activeScenarioKey: newScenarioKey }),

    getCurrentParams: () => {
        const activeScenarioKey = get().activeScenarioKey
        return {
            ...COMMON_PARAMS,
            ...SCENARIOS[activeScenarioKey]
        }
    }
}))