export function average(input: number[]): number {
    let output = 0
    for (let i = 0; i < input.length; i++) {
        output += Number(input[i])
    }
    return output / input.length
}

export function airDensity(hPa: number): number {
    return (hPa * 100) / (293.25 * 287.058)
}

export function altMeter(hPaInit: number, hPaCurr: number): number {
    return (
        ((hPaInit * 100 - hPaCurr * 100) / (airDensity(hPaInit) * 9.81)) * 1.13
    )
}
