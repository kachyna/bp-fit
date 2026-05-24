export const toThousands = (val, leading) => Number(((val || 0) / 1000).toFixed(leading))
export const toMillions = (val, leading) => Number(((val || 0) / 1000000).toFixed(leading))
export const toBillions = (val, leading) => Number(((val || 0) / 1000000000).toFixed(leading))