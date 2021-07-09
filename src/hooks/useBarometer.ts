import { useState, useEffect } from 'react'
import {
    barometer,
    setUpdateIntervalForType,
    SensorTypes,
} from 'react-native-sensors'
import { average } from '../helpers/math'

const MMHG_RATE = 1.3332236
const UPDATE_RATE = 333

export type Data = {
    mmHg: number
    hPaStart: number
    hPa: number
    elevationChange: number
}

setUpdateIntervalForType(SensorTypes.barometer, UPDATE_RATE)

const hPa2mmHg = (hPa: number): number => {
    return parseInt((parseFloat(hPa.toFixed(1)) / MMHG_RATE).toFixed(0))
}

const elevationChange = (hPaStart: number, hPaEnd: number): number => {
    return 0
}

export const useBarometer = (): {
    barometerData: Data
    startUpdates: () => void
    stopUpdates: () => void
} => {
    const [watchStarted, setWatchStarted] = useState(false)
    const [barometerData, setBarometerData] = useState<Data>({
        mmHg: 0,
        hPaStart: 0,
        hPa: 0,
        elevationChange: 0,
    })

    const startUpdates = () => setWatchStarted(true)
    const stopUpdates = () => setWatchStarted(false)

    useEffect(() => {
        let subscription
        if (watchStarted) {
            subscription = barometer.subscribe(
                ({ pressure }) => {
                    setBarometerData({
                        hPaStart: barometerData.hPaStart || pressure,
                        hPa: pressure,
                        mmHg: hPa2mmHg(pressure),
                        elevationChange: elevationChange(
                            barometerData.hPaStart,
                            pressure,
                        ),
                    })
                },
                () => {
                    // not available
                    setWatchStarted(false)
                },
            )
        } else {
            if (subscription) subscription.unsubscribe()
        }
        return () => {
            if (subscription) subscription.unsubscribe()
        }
    }, [watchStarted])

    return { barometerData, startUpdates, stopUpdates }
}
