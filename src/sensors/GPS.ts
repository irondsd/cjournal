import { calculateDistance } from '../helpers/GPS'
import requestLocationPermissions from '../permissions/requestLocationPermissions'
import Geolocation, {
    GeolocationResponse,
} from '@react-native-community/geolocation'

type CallbackType = (data: any) => void | undefined
type LocationType = {
    latitude: number
    longitude: number
}

interface IGPS {
    distance: number
    speed: number
    positions: any
    allowed: boolean
    callback: CallbackType
    watchId: number | undefined
}

export default class GPS implements IGPS {
    distance: number
    speed: number
    positions: LocationType[]
    allowed: boolean
    callback: CallbackType
    watchId: number | undefined

    constructor(callback: CallbackType) {
        this.distance = 0
        this.speed = 0
        this.positions = []
        this.allowed = false

        this.callback = callback
        this.confirmPermissions()
    }

    async confirmPermissions() {
        this.allowed = await requestLocationPermissions()
        return this.allowed
    }

    requestPosition() {
        if (!this.allowed) return console.log('Not allowed to use location')

        Geolocation.getCurrentPosition(
            position => {
                let distance = 0
                if (this.positions[this.positions.length - 1]) {
                    distance =
                        parseInt(
                            calculateDistance(
                                this.positions[this.positions.length - 1]
                                    .latitude,
                                this.positions[this.positions.length - 1]
                                    .longitude,
                                position.coords.latitude,
                                position.coords.longitude,
                            ).toFixed(3),
                        ) * 1000
                }
                this.positions.push({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                this.distance += distance
                if (this.callback) this.callback(this.distance)
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0,
            },
        )
    }

    async getPosition(): Promise<GeolocationResponse> {
        this.allowed = await this.confirmPermissions()

        return new Promise((resolve, reject) => {
            if (!this.allowed) reject('not allowed')

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

    async watchStart(interval = 10000) {
        this.requestPosition()
        this.watchId = setInterval(() => {
            this.requestPosition()
        }, interval)
    }

    watchStop() {
        clearInterval(this.watchId)
    }

    getFirstAndLastPosition() {
        const position: Partial<[LocationType, LocationType]> = []

        if (this.positions.length > 1)
            position.push({
                latitude: this.positions[0].latitude,
                longitude: this.positions[0].longitude,
            })
        if (this.positions.length > 2)
            position.push({
                latitude: this.positions[this.positions.length - 1].latitude,
                longitude: this.positions[this.positions.length - 1].longitude,
            })
        return position
    }
}
