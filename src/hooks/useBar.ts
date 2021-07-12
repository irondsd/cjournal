import { useState, useEffect } from 'react'
import Barometer from 'react-native-barometer'

export const useBarometer = (): {
    barometerData: any
    startUpdates: () => void
    stopUpdates: () => void
} => {
    const [watchStarted, setWatchStarted] = useState(false)
    const [barometerData, setBarometerData] = useState<any>({})
    const [isSupported, setIsSupported] = useState<boolean>(false)

    const startUpdates = () => setWatchStarted(true)
    const stopUpdates = () => setWatchStarted(false)

    useEffect(() => {
        let watchId
        if (watchStarted && isSupported) {
            watchId = Barometer.watch(res => {
                setBarometerData(res)
            })
        }

        return () => {
            if (watchId) Barometer.clearWatch(watchId)
        }
    }, [watchStarted])

    useEffect(() => {
        setIsSupported(Barometer.isSupported())
    }, [])

    // console.log('isSupported:', isSupported)

    return { barometerData, startUpdates, stopUpdates }
}
