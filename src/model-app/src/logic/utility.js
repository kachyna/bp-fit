export const toThousands = (val, leading = 3) => Number(((val || 0) / 1000).toFixed(leading))
export const toMillions = (val, leading = 3) => Number(((val || 0) / 1000000).toFixed(leading))
export const toBillions = (val, leading = 3) => Number(((val || 0) / 1000000000).toFixed(leading))