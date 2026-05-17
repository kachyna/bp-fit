import { create } from 'zustand'
import { SCENARIOS, COMMON_PARAMS } from '../constants/parameters'
import { enrichDatacenter } from '../logic/enrich'

// set, get jsou dependency injection ze Zustand. ta definovana arrow funkce create vraci objekt -- stejny zapis, jako bychom psali => { return { activeScearioKey: ...}}
export const useModelStore = create((set, get) => ({

    // ========= MANAGING DATACENTER STATES ========
    // basic crud operations for datacenters


    // datacenters array that stores all datacenter objects with their input parameters
    datacenters: [
        enrichDatacenter({ id: crypto.randomUUID(), type: 'coloc', itPower: 0, pue: 1.5 }, { SCENARIOS, COMMON_PARAMS })
    ],

    // when adding a datacenter, we create a new object and enrich it with calculated values based on input parameters
    addDatacenter: () => set((state) => ({
        datacenters: [
            ...state.datacenters,
            enrichDatacenter({ id: crypto.randomUUID(), type: 'coloc', itPower: 0, pue: 1.5 }, { SCENARIOS, COMMON_PARAMS }),
        ]
    })),

    // returns all datecenters in an array. used for making aggregations and calculations in the output components 
    readDatacenters: () => get().datacenters,

    // removes datacenter with given id from the datacenters array
    removeDatacenter: (id) => set((state) => ({
        datacenters: state.datacenters.filter(dc => dc.id !== id)
    })),

    // when changing any of the input parameters, we re-calculate all values based on the new input and update the object
    updateDatacenter: (id, field, value) => set((state) => ({
        datacenters: state.datacenters.map(dc => {
            if (dc.id === id) {
                return enrichDatacenter({ ...dc, [field]: field === 'type' ? value : Number(value) }, { SCENARIOS, COMMON_PARAMS })
            }
            return dc
        })
    })),

    // ========= MANAGING CONFIGURATION PARAMETERS ========
    // add the option to manage configuration parameters
    // this adds the possibility to model more complex scenarios, where the user can change
    //      global parameters that influence the calculations and outputs

    params: structuredClone({ COMMON_PARAMS, SCENARIOS }),

    updateParameter: (scenario, paramKey, value) => set((state) => {
        if (scenario === "COMMON_PARAMS") {
            return {
                params: {
                    ...state.params,
                    COMMON_PARAMS: {
                        ...state.params.COMMON_PARAMS,
                        [paramKey]: Number(value)
                    }
                }
            }
        }

        else return {
            params: {
                ...state.params,
                SCENARIOS: {
                    ...state.params.SCENARIOS,
                    [scenario]: {
                        ...state.params.SCENARIOS[scenario],
                        [paramKey]: Number(value)
                    }
                }
            }
        }
    }),

    resetParams: () => set(() => ({
        params: structuredClone({ COMMON_PARAMS, SCENARIOS })
    })),

    getParams: () => {
        return {
            ...COMMON_PARAMS,
            ...SCENARIOS
        }
    },

    setParams: (newParams) => set((state) => ({
        ...state,
        ...newParams
    }))
}))