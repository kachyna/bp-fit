/*

- The engine is comprised of functions that perform calculations on pure numbers.
- These small function are then used in the larger logic, which calculate the results
    for each type of datacenters. That means that each function is called
    three times per scenario.
- In the end, one master function calls the lower level functions wit different scenario
    parameters, meaning that each small function will be called 9 times during 
    the whole model calculation.

*/

// ======= CONSTANTS =======

const YEAR_IN_HOURS = 365 * 24
const TYPES = ['coloc', 'training', 'inference'];
const SCENARIO_KEYS = ['PESIMISTIC', 'REALISTIC', 'OPTIMISTIC']
const DEFAULT_POWER = 0
const DEFAULT_PUE = 1.5

// ======= MISC =======

const safeNum = (val, fallback = 1) => {
    const n = Number(val);   
    return (isNaN(n) || val === null || val === undefined) ? fallback : n;
};

const safeDivisor = (val, fallback = 1) => {
    const n = Number(val);   
    return (isNaN(n) || val === null || val === undefined || n === 0) ? fallback : n;
}

// V tvém enginu to pak vypadá takhle:
const k_occ = safeNum(occupancy[type], 1);
const k_util = safeNum(utilization[type], 1);
const k_combined = k_occ * k_util;

// ======= ELECTRICITY =======

const calcTotalPower = (itPower, PUE) => {
    return itPower * PUE
}

const calcMaxEnergyConsumption = (totalPowerMW) => {
    return totalPowerMW * YEAR_IN_HOURS
}

const calcRealEnergyConsumption = (MaxConsumptionMW, k_utilization) => {
    return MaxConsumptionMW * k_utilization
}

// Agregates energy data of all datacenters
// Returns an object with itPower, totalPoer, maxConsumption and realConsumption for each type of datacenter
export const calcEnergy = (datacenters, {occupancy, utilization}) => {

    const result = {}

    TYPES.forEach(type => {
        // First sort datacenters by type to avoid multiple filtering iterations
        const subset = datacenters.filter(dc => dc.type === type)

        // Iterate once over the subset and power totals in one go
        const totals = subset.reduce((acc, dc) => {
            const p = safeNum(dc.power, DEFAULT_POWER);
            const pue = safeNum(dc.pue, DEFAULT_PUE);

            acc.itPower += p
            acc.totalPower += calcTotalPower(p, pue)
            return acc
        }, { totalPower: 0, maxConsumption: 0, itPower: 0, realConsumption: 0})
        
        // Calculate max energy consumption based on total power
        totals.maxConsumption += calcMaxEnergyConsumption(totals.totalPower)
        
        // Calculate real energy consumption based on max consumption and combined occupancy/utilization factor
        const k_combined = (safeNum(occupancy[type], 1)) * (safeNum(utilization[type], 1));
        totals.realConsumption = totals.maxConsumption * k_combined;

        totals.avgItPower = totals.itPower * k_combined
        // to be finished with other metrics, i have to go to sleep 

        result[type] = totals;
    })

    return result
}

// ======= INVESTMENTS =======

export const calcBuildingCost = (ITPower, buildingCostPerMW) => {
    return ITPower * buildingCostPerMW
}

export const calcITEqupmentCost = (ITPower, equipmentCostPerMW) => {
    return ITPower * equipmentCostPerMW
}

