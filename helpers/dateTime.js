import { strings } from '../localizations'
import { monthNames } from '../properties'
export function displayDate(dateTime) {
    if (dateTime.getDate() === new Date(Date.now()).getDate()) {
        if (dateTime.getYear() === new Date().getYear() && dateTime.getMonth() === new Date().getMonth()) {
            return strings.Today
        }
    }

    if (dateTime.getDate() === new Date(Date.now()).getDate() - 1) {
        if (dateTime.getYear() === new Date().getYear() && dateTime.getMonth() === new Date().getMonth()) {
            return strings.Yesterday
        }
    }

    if (dateTime.getDate() === new Date(Date.now()).getDate() + 1) {
        if (dateTime.getYear() === new Date().getYear() && dateTime.getMonth() === new Date().getMonth()) {
            return strings.Tomorrow
        }
    }

    date = `${dateTime.getDate()} ${strings[monthNames[dateTime.getMonth()]]}`
    return date
}

export function displayDateTime(dateTime) {
    return displayDate(dateTime) + ' ' + strings.at + ' ' + displayTime(dateTime)
}

export function displayTime(dateTime) {
    dateTime = dateTime.toTimeString().substring(0, 5)
    return dateTime
}

export function secs2time(seconds) {
    var sec_num = parseInt(seconds, 10) // don't forget the second param
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - hours * 3600) / 60)
    var seconds = sec_num - hours * 3600 - minutes * 60

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

export function localTime(minutes) {
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

function minutesRU(minutes) {
    if (
        minutes
            .toString()
            .split('')
            .pop() == '1' &&
        minutes != 11
    ) {
        return minutes + ' ' + strings.minute
    }

    if (
        parseInt(
            minutes
                .toString()
                .split('')
                .pop()
        ) >= 2 &&
        parseInt(
            minutes
                .toString()
                .split('')
                .pop()
        ) <= 4
    ) {
        if (minutes > 20 || minutes < 10) {
            return minutes + ' ' + strings.minutes + 'ы'
        }
    }

    return minutes + ' ' + strings.minutes
}

function hoursRU(minutes) {
    if (minutes === 60) return minutes / 60 + ' ' + strings.hour

    if (minutes % 60 != 0) {
        return hoursRU(parseInt(minutes / 60) * 60) + ` ${strings.and} ` + minutesRU(minutes % 60)
    }

    if (minutes > 60 && minutes < 300) return minutes / 60 + ' ' + strings.hour + 'а'

    return minutes / 60 + ' ' + strings.hours
}

function hoursINT(minutes) {
    if (minutes == 60) return minutes / 60 + ' ' + strings.hour

    if (minutes % 60 != 0) {
        return hoursINT(parseInt(minutes / 60) * 60) + ` ${strings.and} ` + minutesINT(minutes % 60)
    }

    return minutes / 60 + ' ' + strings.hours
}

function minutesINT(minutes) {
    if (minutes == 1) return minutes + ' ' + strings.minute
    return minutes + ' ' + strings.minutes
}
