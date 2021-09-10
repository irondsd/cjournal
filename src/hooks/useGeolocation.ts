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
    startUpdates: () => void
    stopUpdates: () => void
    requestGeolocation: () => Promise<GeolocationResponse>
} => {
    const [isAllowed, setIsAllowed] = useState<boolean>()
    const [watchStarted, setWatchStarted] = useState(false)
    const [geolocationData, setGeolocationData] = useState<LocationType[]>([])
    const [lastKnownLocation, setLastKnownLocation] = useState<LocationType>()

    const checkPermissions = async (): Promise<boolean> => {
        if (isAllowed === true || isAllowed === false) return isAllowed
        else {
            const result = await requestLocationPermissions()
            setIsAllowed(result)
            return result
        }
    }

    const requestGeolocation = (): Promise<GeolocationResponse> => {
        return new Promise((resolve, reject) => {
            if (!isAllowed) reject('not allowed')

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

    const startUpdates = () => setWatchStarted(isAllowed ? true : false)
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

                    if (isAllowed && watchStarted) {
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
    }, [isAllowed, watchStarted])

    useEffect(() => {
        checkPermissions()
    }, [])

    return { geolocationData, startUpdates, stopUpdates, requestGeolocation }
}
