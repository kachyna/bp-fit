import * as config from './config.js'

// Agregates data of all datacenters

// Returns an object summarized metrics from the input datacenters, with the same keys as the datacenter objects
// but with the prefix "portfolio" and the sum of all datacenters values for that key.
export const analyzeDatacenters = (datacenterArray) => {

    const ret = {}
    
    datacenterArray.forEach((datacenter) => {
        Object.keys(datacenter).forEach(key => {
            if (key === 'id' || key === 'type') return;

            let newKey = `portfolio${key.charAt(0).toUpperCase() + key.slice(1)}`

            if (config.SCENARIO_KEYS.includes(key)) {
                Object.keys(datacenter[key]).forEach(scenarioParam => {
                    const scenario = key
                    ret[scenario] = ret[scenario] || {}
                    newKey = `portfolio${scenarioParam.charAt(0).toUpperCase() + scenarioParam.slice(1)}`
                    ret[scenario][newKey] = (ret[scenario][newKey] || 0) + datacenter[scenario][scenarioParam]
                })
            }
            else {ret[newKey] = (ret[key] || 0) + datacenter[key]}
        })
    })

    return ret;
}