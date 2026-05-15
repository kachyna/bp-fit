import { create } from 'zustand'
import { SCENARIOS, COMMON_PARAMS } from '../constants/parameters'
import { enrichDatacenter } from '../logic/enrich'

// set, get jsou dependency injection ze Zustand. ta definovana arrow funkce create vraci objekt -- stejny zapis, jako bychom psali => { return { activeScearioKey: ...}}
export const useModelStore = create((set, get) => ({

    // TODO: Make parameters editable in UI

    datacenters: [
        { id: crypto.randomUUID(), type: 'coloc', itPower: 50, pue: 1.2 }
    ],

    addDatacenter: () => set((state) => ({
        

        datacenters: [
            ...state.datacenters,
            enrichDatacenter({ id: crypto.randomUUID(), type: 'coloc', itPower: 0, pue: 1.5 }, {SCENARIOS, COMMON_PARAMS }),
        ]
    })),

    readDatacenters: () => get().datacenters,

    removeDatacenter: (id) => set((state) => ({
        datacenters: state.datacenters.filter(dc => dc.id !== id)
    })),

    updateDatacenter: (id, field, value) => set((state) => ({
        datacenters: state.datacenters.map(dc => {
            if ( dc.id === id ) {
                return enrichDatacenter({ ...dc, [field]: field === 'type' ? value : Number(value) }, {SCENARIOS, COMMON_PARAMS })
            }
            return dc
        })
    })),

    getParams: () => {
        return {
            ...COMMON_PARAMS,
            ...SCENARIOS
        }
    }
}))