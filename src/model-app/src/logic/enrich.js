import * as config from '../constants/config.js'

/*
- This is a pipeline for enriching the datacenter object:
    - datacenter = { id: crypto.randomUUID(), type: 'coloc', power: 0, pue: 1.5 }

- This set of functions is called on every add and every update, taking O(1) time (becuase only the current object is modified).

*/


/**
 * This function takes a datacenter object and parameters object.
 * It validates the input parameters, calculates the metrics for each scenario 
 * and returns an enriched datacenter object with all metrics added.
 * 
 * The metrics are calculated in a pipeline, where each function takes the result of the previous function.
 * 
 * @param {Object} dc - The datacenter object to enrich
 * @param {Object} params - The parameters object containing scenarios and common parameters
 * @returns {Object} The enriched datacenter object
 */
export const enrichDatacenter = (dc, params) => {
    validateParameters(dc, params)

    const dcWithMetrics = { ...dc, ...calcMetricsNotBasedOnParams(dc) }
    const results = {}

    config.SCENARIO_KEYS.forEach(scenario => {

        if ( scenario === "EXPECTED" ) {
            results[scenario] = calculateExpected(results, params, scenario)
            return;
        }

        const scenarioParams = params.SCENARIOS[scenario]

        let acc = {}
        acc = { ...acc, ...calcEnergy(dcWithMetrics, scenarioParams) }
        acc = { ...acc, ...calcCosts({ ...dcWithMetrics, ...acc }, scenarioParams) }
        acc = { ...acc, ...calcEmployment({ ...dcWithMetrics, ...acc }, { ...scenarioParams }) }
        acc = { ...acc, ...calcEnvironment({ ...dcWithMetrics, ...acc }, { ...scenarioParams }) }
        acc = { ...acc, ...calcTaxes({ ...dcWithMetrics, ...acc }, { ...scenarioParams }, params.COMMON_PARAMS) }
        acc = { ...acc, ...calcGvaMetrics({ ...dcWithMetrics, ...acc }, { ...scenarioParams }, params.COMMON_PARAMS) }
        acc = { ...acc, ...finalize({ ...dcWithMetrics, ...acc }, { ...scenarioParams }, params.COMMON_PARAMS) }

        results[scenario] = acc
    })



    return {
        ...dcWithMetrics,
        ...results
    }
}

/**
 * Calculates metrics not dependent on scenario parameters.
 * We calculate them first because they are used in the pipeline for each scenario.
 * 
 * @param {Object} dc - The datacenter object
 * @returns {Object} The enriched datacenter object
 */
const calcMetricsNotBasedOnParams = (dc) => {
    return {
        totalPower: calcTotalPower(dc.itPower, dc.pue),
        maxEnergyConsumption: calcMaxEnergyConsumption(calcTotalPower(dc.itPower, dc.pue)),
        maxITConsumption: calcMaxEnergyConsumption(dc.itPower)
    }
}

/**
 * Recursively validates the parameters object.
 * 
 * @param {Object} obj - The object to validate
 * @param {string} prefix - The prefix for the current path
 */
const validateDeep = (obj, prefix = "") => {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const path = prefix ? `${prefix}.${key}` : key;
        typeof value === 'object' && value !== null ? validateDeep(value, path) : validateNum(value, path)
    })
}

/**
 * Validates datacenter input and model parameters.
 * Throws an error if the parameters are invalid.
 * 
 * @param {Object} dc - The datacenter object
 * @param {Object} params - The parameters object
 */
const validateParameters = (dc, params) => {
    validateNum(dc.itPower, "itPower", dc.id);
    validateNum(dc.pue, "pue", dc.id);
    validateDeep(params);
};

/**
 * Validates if a value is a number and not null or undefined.
 * Throws an error if the value is invalid.
 * 
 * @param {number} val - The value to validate
 * @param {string} fieldName - The name of the field
 * @param {string} datacenterId - The ID of the datacenter. Optional.
 * @returns {number} The validated value
 */
const validateNum = (val, fieldName, datacenterId = null) => {
    const n = Number(val);
    if (isNaN(n) || val === null || val === undefined) {
        if (!datacenterId) {
            throw new Error(`Chyba v konfiguračním poli "${fieldName}": Hodnota "${val}" není platné číslo.`);
        }
        throw new Error(`Chyba v poli "${fieldName}" datacentra "${datacenterId}": Hodnota "${val}" není platné číslo.`);
    }
    return n;
}

// Most of the following functions do not have JSDoc comments, as they are simple enough to not warrant them.

// ======= ELECTRICITY =======

const calcTotalPower = (itPower, PUE) => {
    return itPower * PUE
}

const calcMaxEnergyConsumption = (totalPower) => {
    return totalPower * config.YEAR_IN_HOURS
}

const calcRealEnergyConsumption = (maxConsumption, k) => {
    return maxConsumption * k
}

const calcEnergy = (dc, { occupancy, utilization }) => {
    const k_combined = occupancy[dc.type] * utilization[dc.type];

    return {
        realEnergyConsumption: calcRealEnergyConsumption(dc.maxEnergyConsumption, k_combined),
        realITConsumption: calcRealEnergyConsumption(dc.maxITConsumption, k_combined)
    }
}

// ======= COSTS =======

const calcBuildingInvestment = (itPower, costBuildingPerMW) => {
    return itPower * costBuildingPerMW
}

const calcITEquipmentInvestment = (itPower, costEquipmentPerMW) => {
    return itPower * costEquipmentPerMW
}

const calcElectricityCosts = (realEnergyConsumption, priceElectricityMWh) => {
    return realEnergyConsumption * priceElectricityMWh
}

const calcServiceCosts = (totalInvestment, opexPercentOfTotal) => {
    return totalInvestment * opexPercentOfTotal
}

const calcCosts = (dc, { costBuildingPerMW, costEquipmentPerMW, priceElectricityMWh, opexPercentOfTotal }) => {

    const buildingInvestment = calcBuildingInvestment(dc.itPower, costBuildingPerMW)
    const itEquipmentInvestment = calcITEquipmentInvestment(dc.itPower, costEquipmentPerMW[dc.type])
    const totalInvestment = buildingInvestment + itEquipmentInvestment
    const electricityCosts = calcElectricityCosts(dc.realEnergyConsumption, priceElectricityMWh)
    const otherOpex = calcServiceCosts(totalInvestment, opexPercentOfTotal)

    return {
        buildingInvestment,
        itEquipmentInvestment,
        totalInvestment,
        electricityCosts,
        otherOpex,
        intermediateConsumption: electricityCosts + otherOpex
    }
}

// ======= EMPLOYMENT =======

const calculateEmployment = (itPower, FTEperMW) => {
    return Math.ceil(itPower * FTEperMW)
}

const calcEmployment = (dc, { fteBuildingPerMW, wageConstruction, fteOperationsPerMW, wageOperations }) => {

    return {
        fteConstruction: calculateEmployment(dc.itPower, fteBuildingPerMW),
        fteOperations: calculateEmployment(dc.itPower, fteOperationsPerMW)
    }
}

// ======= ENVIRONMENTAL =======

const calcEmissions = (realEnergyConsumption, emissionFactorTonnesMWh) => {
    return realEnergyConsumption * emissionFactorTonnesMWh
}

const calcWaterConsumption = (realEnergyConsumption, waterConsumptionLitersMWh) => {
    return realEnergyConsumption * waterConsumptionLitersMWh
}

const calcLandUse = (itPower, areaLandPerMW) => {
    return itPower * areaLandPerMW
}

const calcBuildingArea = (totalArea, ratioBuildingLand) => {
    return totalArea * ratioBuildingLand
}

const calcEnvironment = (dc, { emissionFactorTonnesMWh, waterConsumptionLitersMWh, areaLandPerMW, ratioBuildingLand }) => {
    const totalArea = calcLandUse(dc.itPower, areaLandPerMW)

    return {
        emissionsTonnesCO2: calcEmissions(dc.realEnergyConsumption, emissionFactorTonnesMWh),
        waterConsumptionLiters: calcWaterConsumption(dc.realEnergyConsumption, waterConsumptionLitersMWh),
        landUse: totalArea,
        buildingArea: calcBuildingArea(totalArea, ratioBuildingLand)
    }
}

// ======= TAXES =======

const calcEcologyTax = (realEnergyConsumption, taxEcologyMWh) => {
    return realEnergyConsumption * taxEcologyMWh
}

const calcBuildingTax = (buildingArea, taxBuildingM2) => {
    return buildingArea * taxBuildingM2
}

const calcLandTax = (landUse, taxLandM2) => {
    return landUse * taxLandM2
}

const calcMandatoryContributions = (nbFTE, avgWage, taxRate) => {
    return nbFTE * avgWage * taxRate
}

const calcAllContributions = (nbFTE, avgWage, contributionsEmployeeRate, contributionsEmployerRate) => {
    return calcMandatoryContributions(nbFTE, avgWage, contributionsEmployeeRate) +
        calcMandatoryContributions(nbFTE, avgWage, contributionsEmployerRate)
}

const calcPersonalIncomeTax = (nbFTE, avgWage, taxRate, taxDiscount) => {
    return nbFTE * Math.max(0, avgWage * taxRate - taxDiscount)
}

const calcTaxes = (dc, { wageConstruction, wageOperations }, { taxIncomeRate, yearlyTaxDiscount, contributionsEmployeeRate, contributionsEmployerRate, kLocation, taxEcologyMWhRate, taxBuildingM2Rate, taxLandM2Rate }) => ({
    incomeTaxConstruction: calcPersonalIncomeTax(dc.fteConstruction, wageConstruction, taxIncomeRate, yearlyTaxDiscount),
    contributionsConstruction: calcAllContributions(dc.fteConstruction, wageConstruction, contributionsEmployeeRate, contributionsEmployerRate),
    incomeTaxOperations: calcPersonalIncomeTax(dc.fteOperations, wageOperations, taxIncomeRate, yearlyTaxDiscount),
    contributionsOperations: calcAllContributions(dc.fteOperations, wageOperations, contributionsEmployeeRate, contributionsEmployerRate),
    ecologyTax: calcEcologyTax(dc.realEnergyConsumption, taxEcologyMWhRate),
    propertyTax: (calcBuildingTax(dc.buildingArea, taxBuildingM2Rate) + calcLandTax(dc.landUse, taxLandM2Rate)) * kLocation,
})

// ======= GVA =======

const calcColocSales = (itPower, priceService, kOccupancy) => {
    return itPower * priceService * kOccupancy
}

const calcTrainingSales = (priceService, gpuCount, kOccupancy, kUtilization) => {
    return gpuCount * priceService * kOccupancy * kUtilization
}

const calcMaxTokens = (maxITConsumption, inferenceEnergyPerMillionTokensWh) => {
    // Convert MWh to Wh
    return (maxITConsumption * 1000000) / inferenceEnergyPerMillionTokensWh
}

const calcInferenceSales = (maxTokensInMillions, priceService, kOccupancy, kUtilization) => {
    return maxTokensInMillions * priceService * kOccupancy * kUtilization
}

const calcGVA = (sales, intermediateConsumption) => {
    return sales - intermediateConsumption
}

const calcGvaMetrics = (dc, { priceService, occupancy, utilization, kGvaConstruction, inferenceEnergyPerMillionTokensWh }, { trainingGpuCountPerMW }) => {
    switch (dc.type) {
        case 'coloc':
            const sColoc = calcColocSales(dc.itPower, priceService[dc.type], occupancy[dc.type])
            return {
                yearlySales: sColoc,
                yearlyOperationsGva: calcGVA(sColoc, dc.intermediateConsumption),
                yearlyConstructionGva: dc.buildingInvestment * kGvaConstruction

            }
        case 'training':
            const gpuCount = dc.itPower * trainingGpuCountPerMW
            const sTraining = calcTrainingSales(priceService[dc.type], gpuCount, occupancy[dc.type], utilization[dc.type])
            return {
                gpuCount: gpuCount,
                yearlySales: sTraining,
                yearlyOperationsGva: calcGVA(sTraining, dc.intermediateConsumption),
                yearlyConstructionGva: dc.buildingInvestment * kGvaConstruction
            }
        case 'inference':
            const maxTokens = calcMaxTokens(dc.maxITConsumption, inferenceEnergyPerMillionTokensWh)
            const sInference = calcInferenceSales(maxTokens, priceService[dc.type], occupancy[dc.type], utilization[dc.type])
            return {
                maxYearlyTokensInMillions: maxTokens,
                realYearlyTokensInMillions: maxTokens * occupancy[dc.type] * utilization[dc.type],
                yearlySales: sInference,
                yearlyOperationsGva: calcGVA(sInference, dc.intermediateConsumption),
                yearlyConstructionGva: dc.buildingInvestment * kGvaConstruction
            }
        default:
            throw new Error(`Neznámý typ datacentra: ${dc.type}`)
    }

    return {
        yearlySales: calcSales(dc, priceService[dc.type], occupancy[dc.type]),
    }
}

// adds final calcultaions to the results object. This has been added after initial implementation, otherwise it could have been
// a part of other functions
const finalize = (results, scenarioParams, commonParams) => {
    const ret = {};

    ret["totalPublicIncome"] = results.incomeTaxConstruction + results.contributionsConstruction + results.incomeTaxOperations + results.contributionsOperations + results.ecologyTax + results.propertyTax
    ret["totalOperationsCapex"] = results.buildingInvestment + results.itEquipmentInvestment * scenarioParams.durationOperationsYrs / scenarioParams.itEquipmentDepreciationPeriodYrs
    ret["annualizedCapex"] = ret["totalOperationsCapex"] / scenarioParams.durationOperationsYrs

    return ret;
}

// ====== EXPECTED SCENARIO CALCULATION =======

const calculateExpected = (results, params, expectedScenarioKey) => {
    const expectedResults = {}

    config.SCENARIO_KEYS.forEach(scenario => {
        if (scenario === expectedScenarioKey) {
            return;
        }
        
        const probability = params.SCENARIOS[scenario].scenarioProbability;
        
        Object.entries(results[scenario]).forEach(([key, value]) => {
            if (typeof value === 'number') {
                expectedResults[key] = (expectedResults[key] || 0) + (value * probability);
            }
        });
    });

    return expectedResults;
}



