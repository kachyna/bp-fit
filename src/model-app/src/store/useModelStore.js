import { create } from 'zustand'
import { SCENARIOS, COMMON_PARAMS } from '../constants/parameters'

// set, get jsou dependency injection ze Zustand. ta definovana arrow funkce create vraci objekt -- stejny zapis, jako bychom psali => { return { activeScearioKey: ...}}
export const useModelStore = create((set, get) => ({

    datacenters: [
        { id: '1', type: 'coloc', itPower: 50, pue: 1.2 }
    ],

    addDatacenter: () => set((state) => ({
        datacenters: [
            ...state.datacenters,
            { id: crypto.randomUUID(), type: 'coloc', itPower: 0, pue: 1.5 }
        ]
    })),

    readDatacenters: () => get().datacenters,

    removeDatacenter: (id) => set((state) => ({
        datacenters: state.datacenters.filter(dc => dc.id !== id)
    })),

    updateDatacenter: (id, field, value) => set((state) => ({
        datacenters: state.datacenters.map(dc =>
            dc.id === id ? { ...dc, [field]: value } : dc
        )
    })),

    getParams: () => {
        return {
            ...COMMON_PARAMS,
            ...SCENARIOS
        }
    }
}))