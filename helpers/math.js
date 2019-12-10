export function average(input) {
    this.output = 0
    for (this.i = 0; this.i < input.length; this.i++) {
        this.output += Number(input[this.i])
    }
    return this.output / input.length
}

export function airDensity(hPa) {
    return (hPa * 100) / (293.25 * 287.058)
}

export function altMeter(hPaInit, hPaCurr) {
    return ((hPaInit * 100 - hPaCurr * 100) / (airDensity(hPaInit) * 9.81)) * 1.13
}
