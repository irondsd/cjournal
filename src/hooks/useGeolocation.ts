import { useState, useEffect } from 'react'
import requestLocationPermissions from '../permissions/requestMicrophonePermissions'
import Geolocation, {
    GeolocationResponse,
} from '@react-native-community/geolocation'

export type LocationType = {
    latitude: number
    longitude: number
}

export const useGeolocation = (): {
    geolocationData: LocationType[]
    isAvailable: boolean | undefined
    startUpdates: () => void
    stopUpdates: () => void
    requestGeolocation: () => Promise<GeolocationResponse>
} => {
    const [isAvailable, setIsAvailable] = useState<boolean>()
    const [watchStarted, setWatchStarted] = useState(false)
    const [geolocationData, setGeolocationData] = useState<LocationType[]>([])
    const [lastKnownLocation, setLastKnownLocation] = useState<LocationType>()

    const checkPermissions = async (): Promise<boolean> => {
        if (isAvailable === true || isAvailable === false) return isAvailable
        else {
            const result = await requestLocationPermissions()
            setIsAvailable(result)
            return result
        }
    }

    const requestGeolocation = (): Promise<GeolocationResponse> => {
        return new Promise((resolve, reject) => {
            if (!isAvailable) reject('not allowed')

            Geolocation.getCurrentPosition(
                position => {
                    resolve(position)
                },
                error => {
                    // retry with low accuracy
                    Geolocation.getCurrentPosition(position => {
                        resolve(position)
                    }),
                        (error: Error) => {
                            reject(error)
                        },
                        {
                            enableHighAccuracy: false,
                            timeout: 20000,
                            maximumAge: 1000,
                        }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000,
                },
            )
        })
    }

    const startUpdates = () => setWatchStarted(isAvailable ? true : false)
    const stopUpdates = () => setWatchStarted(false)

    useEffect(() => {
        if (geolocationData.length === 0 && lastKnownLocation !== undefined)
            setGeolocationData([...geolocationData, lastKnownLocation])

        const intervalId = setInterval(() => {
            requestGeolocation()
                .then(position => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }

                    if (isAvailable && watchStarted) {
                        setGeolocationData(data => [...data, location])
                    } else {
                        setLastKnownLocation(location)
                    }
                })
                .catch(err => console.log('Geolocation data error: ', err))
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [isAvailable, watchStarted])

    useEffect(() => {
        checkPermissions()
    }, [])

    return {
        geolocationData,
        isAvailable,
        startUpdates,
        stopUpdates,
        requestGeolocation,
    }
}
