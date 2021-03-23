import { barometer } from 'react-native-sensors'
import { average } from '../helpers/math'

interface BarometerClass {
    initialPressure: number
    lastValue: number
    hPa: number
    mmHg: string
    pressures: number[]
    bar: number | null
}

export default class Barometer implements BarometerClass {
    initialPressure: number
    lastValue: number
    hPa: number
    mmHg: string
    pressures: number[]
    bar: any // sensor

    constructor() {
        this.initialPressure = 0
        this.lastValue = 0
        this.hPa = 0
        this.mmHg = '0'
        this.pressures = []
        this.bar = null
    }

    initialize(callback) {
        const bar = barometer.subscribe(
            ({ pressure }) => {
                if (this.initialPressure === 0 && this.pressures.length > 30) {
                    this.initialPressure = average(this.pressures)
                }

                this.pressures.push(pressure)
                this.lastValue = pressure
                this.hPa = average(this.pressures)
                this.mmHg = (
                    parseFloat(average(this.pressures).toFixed(1)) / 1.3332236
                ).toFixed(0)

                if (this.pressures.length > 300) {
                    bar.unsubscribe()
                }
                callback()
            },
            error => {
                console.log('Barometer is not available on this device')
            },
        )
    }

    startUpdates() {
        this.bar = barometer.subscribe(
            ({ pressure }) => {
                if (this.initialPressure === 0 && this.pressures.length > 30) {
                    this.initialPressure = average(this.pressures)
                }

                this.pressures.push(pressure)
                if (this.pressures.length > 300) {
                    this.pressures.splice(0, 1)
                }

                this.lastValue = pressure
                this.hPa = average(this.pressures)
                this.mmHg = (
                    parseFloat(average(this.pressures).toFixed(1)) / 1.3332236
                ).toFixed(0)
            },
            error => {
                // console.log('Barometer is not available on this device')
            },
        )
    }

    stopUpdates() {
        this.bar.unsubscribe()
    }

    static calibrate(seconds = 10) {
        // console.log('Calibrating barometer...')
        const bar = barometer.subscribe(
            ({ pressure }) => {},
            error => {
                // console.log('Barometer is not available on this device')
            },
        )

        setTimeout(() => {
            if (bar) {
                // console.log('Calibrating done!')
                bar.unsubscribe()
            }
        }, seconds * 1000)
    }
}
