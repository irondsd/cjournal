import Pedometer from '@JWWon/react-native-universal-pedometer'

export default class PedometerSensor {
    constructor(cb = null) {
        this.steps = 0
        this.distance = 0

        if (cb) this.callback = cb
    }

    startUpdates(dateTime) {
        console.log('called')
        Pedometer.isStepCountingAvailable((error, isAvailable) => {
            if (isAvailable) {
                console.log('available')
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
                console.log('Not available')
            }
        })
    }

    stopUpdates() {
        Pedometer.stopPedometerUpdates()
    }
}
