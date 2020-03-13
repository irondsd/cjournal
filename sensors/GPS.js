import { calculateDistance } from '../helpers/GPS'
import requestLocationPermissions from '../permissions/requestLocationPermissions'
import Geolocation from '@react-native-community/geolocation'

export default class GPS {
    constructor(cb = null) {
        this.distance = 0
        this.speed = 0
        this.positions = []
        this.allowed = false

        if (cb) this.callback = cb
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
                        calculateDistance(
                            this.positions[this.positions.length - 1][0],
                            this.positions[this.positions.length - 1][1],
                            position.coords.latitude,
                            position.coords.longitude,
                        ).toFixed(3) * 1000
                }
                this.positions.push([
                    position.coords.latitude,
                    position.coords.longitude,
                ])
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

    async getPosition() {
        let allowed = await this.confirmPermissions()

        return new Promise((resolve, reject) => {
            if (!allowed) reject('not allowed')

            Geolocation.getCurrentPosition(
                position => {
                    resolve(position)
                },
                error => {
                    // retry with low accuracy
                    Geolocation.getCurrentPosition(position => {
                        resolve(position)
                    }),
                        error => {
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
        result = {
            positionStart: null,
            positionEnd: null,
        }
        if (this.positions.length > 1) result.positionStart = this.positions[0]
        if (this.positions.length > 2)
            result.positionEnd = this.positions[this.positions.length - 1]
        return result
    }
}
