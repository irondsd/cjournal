import {barometer} from 'react-native-sensors'

export default class Barometer {
    constructor() {
        this.initialPressure = 0
        this.lastValue = 0
        this.metersAcc = 0
        this.metersDec = 0
        this.hPa = 0
        this.mmHg = 0
        this.pressures = []
        this.bar = null
    }

    startUpdates() {
        this.bar = barometer.subscribe(
            ({pressure}) => {
                if (initialPressure === 0 && pressures.length > 30) {
                    initialPressure = average(pressures)
                }

                pressures.push(pressure)
                if (pressures.length > 300) {
                    pressures.splice(0, 1)
                }

                this.lastValue = pressure
                this.hPa = average(pressures)
                this.mmHg = (average(pressures).toFixed(1) / 1.3332236).toFixed(
                    0,
                )
            },
            error => {
                console.log('Barometer is not available on this device')
            },
        )
    }
    stopUpdates() {
        this.bar.unsubscribe()
    }

    static calibrate(seconds = 60) {
        // console.log('Calibrating barometer...')
        bar = barometer.subscribe(
            ({pressure}) => {},
            error => {
                // console.log('Barometer is not available on this device')
            },
        )

        setTimeout(() => {
            if (bar) {
                console.log('Calibrating done!')
                bar.unsubscribe()
            }
        }, seconds * 1000)
    }
}
