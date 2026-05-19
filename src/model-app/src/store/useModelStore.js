import { create } from 'zustand'
import { SCENARIOS, COMMON_PARAMS } from '../constants/parameters'
import { enrichDatacenter } from '../logic/enrich'
import { immer } from 'zustand/middleware/immer'

// set, get jsou dependency injection ze Zustand. ta definovana arrow funkce create vraci objekt -- stejny zapis, jako bychom psali => { return { activeScearioKey: ...}}
export const useModelStore = create(immer((set, get) => ({

    // ========= MANAGING DATACENTER STATES ========
    // basic crud operations for datacenters


    // datacenters array that stores all datacenter objects with their input parameters
    datacenters: [
        enrichDatacenter({ id: crypto.randomUUID(), type: 'coloc', itPower: 5, pue: 1.5, count: 1 }, { SCENARIOS, COMMON_PARAMS })
    ],

    // when adding a datacenter, we create a new object and enrich it with calculated values based on input parameters
    addDatacenter: () => set((state) => {
        state.datacenters.push(
            enrichDatacenter({ id: crypto.randomUUID(), type: 'coloc', itPower: 5, pue: 1.5, count: 1 }, state.params)
        )
    }),

    // returns all datecenters in an array. used for making aggregations and calculations in the output components 
    readDatacenters: () => get().datacenters,

    // removes datacenter with given id from the datacenters array
    removeDatacenter: (id) => set((state) => {
        state.datacenters = state.datacenters.filter(dc => dc.id !== id)
    }),

    // when changing any of the input parameters, we re-calculate all values based on the new input and update the object
    updateDatacenter: (id, field, value) => set((state) => {
        const index = state.datacenters.findIndex(dc => dc.id === id)

        if (index !== -1) {
        const currentDc = state.datacenters[index]
        const updatedDc = enrichDatacenter({ ...currentDc, [field]: field === 'type' ? value : Number(value) }, state.params)

        state.datacenters[index] = updatedDc;
        }
    }),

    updateAllDatacenters: () => set((state) => {
        state.datacenters = state.datacenters.map(dc => enrichDatacenter(dc, state.params))
    }),

    // ========= MANAGING CONFIGURATION PARAMETERS ========
    // add the option to manage configuration parameters
    // this adds the possibility to model more complex scenarios, where the user can change
    //      global parameters that influence the calculations and outputs

    params: structuredClone({ COMMON_PARAMS, SCENARIOS }),

    updateParameterByPath: (path, value) => set((state) => {
      let current = state.params;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }

      current[path[path.length - 1]] = Number(value);
    }),

    resetParams: () => set((state) => {
        state.params = structuredClone({ COMMON_PARAMS, SCENARIOS })
    }),

    getParams: () => {
        const currentParams = get().params;
        return {
            ...currentParams.COMMON_PARAMS,
            ...currentParams.SCENARIOS
        }
    },
})))