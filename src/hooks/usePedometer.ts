import { useState, useEffect } from 'react'
import Pedometer, {
    PedometerInterface,
} from '@t2tx/react-native-universal-pedometer'

export const usePedometer = (): {
    pedometerData: PedometerInterface
    startUpdates: () => void
    stopUpdates: () => void
} => {
    const [watchStarted, setWatchStarted] = useState(false)
    const [pedometerData, setPedometerData] = useState<PedometerInterface>()

    const startUpdates = () => setWatchStarted(true)
    const stopUpdates = () => setWatchStarted(false)

    useEffect(() => {
        if (watchStarted) {
            Pedometer.isStepCountingAvailable((error, isAvailable) => {
                if (isAvailable) {
                    Pedometer.startPedometerUpdatesFromDate(
                        new Date().getTime(),
                        pedometerData => {
                            console.log(pedometerData)
                            setPedometerData(pedometerData)
                        },
                    )
                } else {
                    console.log('Pedometer is not available')
                }
            })
        } else {
            Pedometer.stopPedometerUpdates()
        }

        return () => {
            Pedometer.stopPedometerUpdates()
        }
    }, [watchStarted])

    return { pedometerData, startUpdates, stopUpdates }
}
