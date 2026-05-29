import * as config from '../constants/config.js'

/**
 * Agregates data of all datacenters.
 * Automatically reads all properties in the array and prefixes them with "portfolio".
 * If a property is a scenario configured in constants.SCENARIO_KEYS,
 *  it will create a nested object with the scenario name as the key.
 * 
 * In other words, this function simply summarizes the datacenterArray into portfolio-level data.
 * 
 * @param {Object[]} datacenterArray Array of datacenter objects
 * @returns {Object} Object with summarized metrics
 */
export const analyzeDatacenters = (datacenterArray) => {

    const ret = {}

    // In all branches of this code, we multiply the result with dc.count.
    // This is because useModelStore only stores individual datacenter data, 
    // not aggregated portfolio data.

    // For each datacenter in our store...
    datacenterArray.forEach((datacenter) => {

        // ..iterate through each property.
        Object.keys(datacenter).forEach(key => {

            // Skip id and type (NaN).
            if (key === 'id' || key === 'type') return;

            // For all other values, create a new key prefixed with "portfolio".
            let newKey = `portfolio${key.charAt(0).toUpperCase() + key.slice(1)}`

            // If the property key is a scenario key...
            if (config.SCENARIO_KEYS.includes(key)) {

                // ...iterate over the scenario's properties...
                Object.keys(datacenter[key]).forEach(scenarioParam => {
                    const scenario = key
                    // ... add the scenario to the ret object...
                    ret[scenario] = ret[scenario] || {}
                    newKey = `portfolio${scenarioParam.charAt(0).toUpperCase() + scenarioParam.slice(1)}`
                    // ... and add the value to the scenario's property (nested object).
                    ret[scenario][newKey] = (ret[scenario][newKey] || 0) + datacenter[scenario][scenarioParam] * datacenter.count
                })
            }

            // If the object is not dependent on any scenario...
            else {

                // ... add it directly to the ret object (first level). 
                key === "count" ? ret[newKey] = (ret[newKey] || 0) + datacenter[key] :
                    ret[newKey] = (ret[newKey] || 0) + datacenter[key] * datacenter.count
            }
        })
    })

    return ret;
}