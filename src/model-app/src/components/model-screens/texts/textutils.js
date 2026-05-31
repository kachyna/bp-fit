import { CALCULATION_DETAILS } from "@/constants/calculation-details"

/**
 * Formats a number with leading zeros and scientific notation.
 * Automatically converts to Czech locale numbers.
 * 
 * @param {number} val The value to format.
 * @param {number} leading The number of leading zeros to add.
 * @param {number} exp The exponent to use for scientific notation.
 * @returns {string} The formatted number.
 */
const formatExp = (val, leading = 3, exp = 0) =>
    `${(val / 10 ** exp).toLocaleString("cs-CZ", { minimumFractionDigits: leading, maximumFractionDigits: leading })}`

/**
 * Formats a number with optional leading zeros and scientific notation based on the unit: 
 * 
 * - If the unit starts with "tis.", the number is divided by 1000.
 * - If the unit starts with "mil.", the number is divided by 1 000 000.
 * - If the unit starts with "mld.", the number is divided by 1 000 000 000.
 * - Otherwise the number is not changed.
 * 
 * Automatically converts to Czech locale.
 * 
 * @param {number} val The value to format.
 * @param {number} leading The number of leading zeros to add. Default is 3.
 * @param {string} unit The unit to append. 
 * @returns {string} The formatted number with the unit.
 */
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

/**
 * Prepares data for display by formatting the values and adding them to an object.
 * This function uses CALCULATION_DETAILS located in constants folder for formatting parameters. 
 * If the key is not found in CALCULATION_DETAILS, it will throw an error.
 * 
 * @param {object} data The data object to prepare.
 * @param {string[]} keys The keys to use for formatting.
 * @returns {object} An object of keys with formatted and raw values for easier management.
 */
export const prepareData = (data, keys) => {
    const ret = {}
    keys.forEach(key => {
        if (!CALCULATION_DETAILS[key]) {
            throw new Error("Missing calculation detail for " + key)
        }
        if (data[key] === undefined) {
            throw new Error("Missing calculation data for " + key)
        }
        ret[key] = {
            ...CALCULATION_DETAILS[key],
            "formatted": formatData(data[key] || 0, CALCULATION_DETAILS[key]["decimals"], CALCULATION_DETAILS[key]["formattedUnit"]),
            "value": data[key] || 0
        }
        
        // If the formatted value does not contain any non-zero digit,
        // it means that the value is very small and is displayed as 0 with the current formatting.
        let containsDigit = false;
        ["1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(cipher => {
            if (ret[key].formatted.includes(cipher)) {
                containsDigit = true;
            }
        });

        // In this case, we will try to display more decimal places to show the value more accurately.
        // This is a common issue when dealing with very small numbers, especially in scientific calculations.
        if (!containsDigit && data[key] !== 0) {
            ret[key].formatted = formatData(data[key] || 0, 3, CALCULATION_DETAILS[key]["formattedUnit"]);
        }
    })
    return ret
}