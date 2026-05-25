import { CALCULATION_DETAILS } from "@/constants/calculation-details"

const formatExp = (val, leading, exp = 0) =>
    `${(val / 10 ** exp).toLocaleString("cs-CZ", { minimumFractionDigits: leading, maximumFractionDigits: leading })}`

export const formatData = (val, leading = 3, unit = "") => {
    if (unit.startsWith("tis.")) {
        return formatExp(val, leading, 3) + " " + unit
    }
    if (unit.startsWith("mil.")) {
        return formatExp(val, leading, 6) + " " + unit
    }
    if (unit.startsWith("mld.")) {
        return formatExp(val, leading, 9) + " " + unit
    }
    return formatExp(val, leading, 0) + " " + unit
}


// Returns an object of keys with formatted and raw values for easier management
// Keys are taken from the input array, data from data object and format from CALCULATION_DETAILS
export const prepareData = (data, keys) => {
    const ret = {}
    keys.forEach(key => {
        if (!CALCULATION_DETAILS[key]) {
            throw new Error("Missing calculation detail for " + key)
        }
        if (!data[key]) {
            throw new Error("Missing calculation data for " + key)
        }
        ret[key] = {
            ...CALCULATION_DETAILS[key],
            "formatted": formatData(data[key] || 0, CALCULATION_DETAILS[key]["decimals"], CALCULATION_DETAILS[key]["formattedUnit"]),
            "value": data[key] || 0
        }
    })
    return ret
}