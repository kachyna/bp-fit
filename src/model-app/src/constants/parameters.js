export const COMMON_PARAMS = {
  // Daně a odvody
  taxIncomeRate: 0.15,
  yearlyTaxDiscount: 30840,
  contributionsEmployer: 0.338,
  contributionsEmployee: 0.116,
  taxEcologyMWh: 28.30,
  taxBuildingM2: 18,
  taxLandM2: 9,
  kLocation: 7,
  
  // Specifické technické parametry
  trainingGpuCountPerMW: 800,
};

export const SCENARIOS = {
  PESIMISTIC: {
    label: 'Pesimistický',
    // Investice a výstavba
    costBuildingPerMW: 148200000,
    fteBuildingPerMW: 4.0,
    wageConstruction: 660000,
    durationConstructionYrs: 1.5,
    // Provoz
    durationOperationsYrs: 25,
    fteOperationsPerMW: 0.3,
    wageOperations: 780000,
    priceElectricityMWh: 1768,
    opexPercentOfTotal: 0.04,
    // Enviro a pozemky
    emissionFactorTonnesMWh: 0.43,
    waterConsumptionLitersMWh: 1800,
    areaLandPerMW: 2400,
    ratioBuildingLand: 0.5819,
    // Koeficienty typů DC (Obsazenost / Využití)
    occupancy: { coloc: 0.88, training: 1.0, inference: 1.0 },
    utilization: { coloc: 0.40, training: 0.80, inference: 0.20 },
    // Náklady na HW a ceny služeb
    costEquipmentPerMW: { coloc: 0, training: 618000000, inference: 319000000 },
    priceService: { 
      colocYearlyMW: 44490000, 
      trainingYearlyGPU: 360921, 
      inferenceMillionTokens: 10.09 
    },
    inferenceEnergyPerMillionTokensWh: 17400
  },

  REALISTIC: {
    label: 'Realistický',
    costBuildingPerMW: 211700000,
    fteBuildingPerMW: 5.0,
    wageConstruction: 720000,
    durationConstructionYrs: 2.0,
    durationOperationsYrs: 30,
    fteOperationsPerMW: 0.4,
    wageOperations: 900000,
    priceElectricityMWh: 2210,
    opexPercentOfTotal: 0.03,
    emissionFactorTonnesMWh: 0.33,
    waterConsumptionLitersMWh: 2350,
    areaLandPerMW: 2998,
    ratioBuildingLand: 0.7274,
    occupancy: { coloc: 0.926, training: 1.0, inference: 1.0 },
    utilization: { coloc: 0.50, training: 0.90, inference: 0.50 },
    costEquipmentPerMW: { coloc: 0, training: 721000000, inference: 360500000 },
    priceService: { 
      colocYearlyMW: 48700000, 
      trainingYearlyGPU: 541368, 
      inferenceMillionTokens: 10.09 
    },
    inferenceEnergyPerMillionTokensWh: 13925
  },

  OPTIMISTIC: {
    label: 'Optimistický',
    costBuildingPerMW: 275200000,
    fteBuildingPerMW: 6.0,
    wageConstruction: 780000,
    durationConstructionYrs: 3.0,
    durationOperationsYrs: 35,
    fteOperationsPerMW: 0.5,
    wageOperations: 1080000,
    priceElectricityMWh: 2652,
    opexPercentOfTotal: 0.02,
    emissionFactorTonnesMWh: 0.23,
    waterConsumptionLitersMWh: 2900,
    areaLandPerMW: 3600,
    ratioBuildingLand: 0.8728,
    occupancy: { coloc: 0.972, training: 1.0, inference: 1.0 },
    utilization: { coloc: 0.60, training: 1.0, inference: 0.80 },
    costEquipmentPerMW: { coloc: 0, training: 824000000, inference: 412000000 },
    priceService: { 
      colocYearlyMW: 53150000, 
      trainingYearlyGPU: 721824, 
      inferenceMillionTokens: 10.09 
    },
    inferenceEnergyPerMillionTokensWh: 10450
  }
};