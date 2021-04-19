import Pedometer, {
    PedometerInterface,
} from '@t2tx/react-native-universal-pedometer'

interface Pedometer {
    steps: number
    distance: number
    callback: (data: PedometerInterface) => void
}

export default class PedometerSensor implements Pedometer {
    steps: number
    distance: number
    callback: (data: PedometerInterface) => void

    constructor(cb = null) {
        this.steps = 0
        this.distance = 0

        if (cb) this.callback = cb
    }

    startUpdates(dateTime) {
        Pedometer.isStepCountingAvailable((error, isAvailable) => {
            if (isAvailable) {
                Pedometer.startPedometerUpdatesFromDate(
                    dateTime.getTime(),
                    pedometerData => {
                        console.log(pedometerData)
                        this.steps = pedometerData.numberOfSteps
                        this.distance = pedometerData.distance
                        if (this.callback) this.callback(pedometerData)
                    },
                )
            } else {
                console.log('Pedometer is not available')
            }
        })
    }

    stopUpdates() {
        Pedometer.stopPedometerUpdates()
    }
}
