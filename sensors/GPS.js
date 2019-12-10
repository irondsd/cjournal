import {calculateDistance} from '../helpers/GPS'

export default class GPS {
    constructor(cb = null) {
        this.distance = 0
        this.speed = 0
        this.positions = []

        if (cb) this.callback = cb
    }

    requestPosition() {
        navigator.geolocation.getCurrentPosition(
            position => {
                // console.log("Got position", position.coords);
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
                timeout: 20000,
                maximumAge: 1000,
            },
        )
    }

    watchStart(interval = 10000) {
        this.intervalId = setInterval(() => {
            this.requestPosition()
        }, interval)
    }

    watchStop() {
        clearInterval(this.intervalId)
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
