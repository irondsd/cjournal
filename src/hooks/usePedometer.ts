import { useState, useEffect } from 'react'
import Pedometer, {
    PedometerInterface,
} from '@t2tx/react-native-universal-pedometer'

export const usePedometer = (): {
    pedometerData: PedometerInterface
    isAvailable: boolean
    startUpdates: () => void
    stopUpdates: () => void
} => {
    const [isAvailable, setIsAvailable] = useState(true)
    const [watchStarted, setWatchStarted] = useState(false)
    const [pedometerData, setPedometerData] = useState<PedometerInterface>({
        numberOfSteps: 0,
        distance: 0,
        startDate: 0,
        endDate: 0,
    })

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
                            if (pedometerData) setPedometerData(pedometerData)
                            else console.log('pedometer data is null')
                        },
                    )
                } else {
                    console.log('Pedometer is not available')
                    setIsAvailable(false)
                }
            })
        } else {
            Pedometer.stopPedometerUpdates()
        }

        return () => {
            Pedometer.stopPedometerUpdates()
        }
    }, [watchStarted])

    return { pedometerData, isAvailable, startUpdates, stopUpdates }
}
