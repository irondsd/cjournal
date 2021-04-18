import { strings } from '../localization'
import { months } from '../constants'
import timestamp from './timestamp'

export function displayDate(dateTime: Date): string {
    if (dateTime.getDate() === new Date(Date.now()).getDate()) {
        if (
            dateTime.getFullYear() === new Date().getFullYear() &&
            dateTime.getMonth() === new Date().getMonth()
        ) {
            return strings.Today
        }
    }

    if (dateTime.getDate() === new Date(Date.now()).getDate() - 1) {
        if (
            dateTime.getFullYear() === new Date().getFullYear() &&
            dateTime.getMonth() === new Date().getMonth()
        ) {
            return strings.Yesterday
        }
    }

    if (dateTime.getDate() === new Date(Date.now()).getDate() + 1) {
        if (
            dateTime.getFullYear() === new Date().getFullYear() &&
            dateTime.getMonth() === new Date().getMonth()
        ) {
            return strings.Tomorrow
        }
    }

    const date = `${dateTime.getDate()} ${strings[months[dateTime.getMonth()]]}`
    return date
}

export function displayDateTime(dateTime: Date): string {
    return (
        displayDate(dateTime) + ' ' + strings.at + ' ' + displayTime(dateTime)
    )
}

export function displayTime(dateTime: Date): string {
    return dateTime.toTimeString().substring(0, 5)
}

export function secs2time(secondsNumber: number) {
    let hours: string | number = Math.floor(secondsNumber / 3600)
    let minutes: string | number = Math.floor(
        (secondsNumber - hours * 3600) / 60,
    )
    let seconds: string | number = secondsNumber - hours * 3600 - minutes * 60

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds
    } else {
        return minutes + ':' + seconds
    }
}

export function localTime(minutes: number): string {
    if (minutes === 0) return strings.NotSelected

    switch (strings.minute) {
        case 'минута': // русский
            if (minutes >= 60) {
                // for hours
                return hoursRU(minutes)
            }
            // for minutes
            return minutesRU(minutes)
            break
        case 'minuto': // español
            if (minutes >= 60) return hoursINT(minutes)

            return minutesINT(minutes)
            break
        default:
            // english
            if (minutes >= 60) return hoursINT(minutes)

            return minutesINT(minutes)
            break
    }
}

function minutesRU(minutes: number): string {
    if (minutes.toString().split('').pop() == '1' && minutes != 11) {
        return minutes + ' ' + strings.minute
    }

    if (
        parseInt(`${minutes.toString().split('').pop()}`) >= 2 &&
        parseInt(`${minutes.toString().split('').pop()}`) <= 4
    ) {
        if (minutes > 20 || minutes < 10) {
            return minutes + ' ' + strings.minutes + 'ы'
        }
    }

    return minutes + ' ' + strings.minutes
}

function hoursRU(minutes: number): string {
    if (minutes === 60) return minutes / 60 + ' ' + strings.hour

    if (minutes % 60 != 0) {
        return (
            hoursRU(parseInt(`${minutes / 60}`) * 60) +
            ` ${strings.and} ` +
            minutesRU(minutes % 60)
        )
    }

    if (minutes > 60 && minutes < 300)
        return minutes / 60 + ' ' + strings.hour + 'а'

    return minutes / 60 + ' ' + strings.hours
}

function hoursINT(minutes: number): string {
    if (minutes == 60) return minutes / 60 + ' ' + strings.hour

    if (minutes % 60 != 0) {
        return (
            hoursINT(parseInt(`${minutes / 60}`) * 60) +
            ` ${strings.and} ` +
            minutesINT(minutes % 60)
        )
    }

    return minutes / 60 + ' ' + strings.hours
}

function minutesINT(minutes: number): string {
    if (minutes == 1) return minutes + ' ' + strings.minute
    return minutes + ' ' + strings.minutes
}

export function getUtcOffset(): number {
    return new Date().getTimezoneOffset() * -1
}

export function getNearestHalfAnHour(unixTimestamp: number): number {
    const time = new Date(unixTimestamp * 1000)
    const hours = time.getHours()
    const minutes = time.getMinutes()

    if (minutes < 25) {
        time.setMinutes(30)
    } else if (minutes < 55) {
        time.setHours(hours + 1)
        time.setMinutes(0)
    }
    time.setSeconds(0)
    time.setMilliseconds(0)

    return timestamp(time)
}
