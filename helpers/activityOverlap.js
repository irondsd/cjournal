import { overlaps } from '../constants'
import timestamp from './timestamp'

export function overlappingGreying(state) {
    let dateTime = timestamp()
    let Sleep = false
    let PhysicalLoad = false
    let Activity = false
    let Pills = false
    let Tests = false
    let Service = false

    for (let i = 0; i < state.length; i++) {
        if (state[i].time_ended == null || state[i].time_ended == 'null')
            continue

        if (
            state[i].time_started < dateTime &&
            state[i].time_ended > dateTime
        ) {
            if (overlaps.Sleep.includes(state[i].activity_type)) {
                Sleep = true
            }
            if (overlaps.PhysicalLoad.includes(state[i].activity_type)) {
                PhysicalLoad = true
            }
            if (overlaps.Activity.includes(state[i].activity_type)) {
                Activity = true
            }
            if (overlaps.Pills.includes(state[i].activity_type)) {
                Pills = true
            }
            if (overlaps.Tests.includes(state[i].activity_type)) {
                Tests = true
            }
            if (overlaps.Service.includes(state[i].activity_type)) {
                Service = true
            }
        }
    }

    return [Sleep, PhysicalLoad, Activity, Pills, Tests, Service]
}

export function activitySingleOverlap(state, activity) {
    let time_started = activity.time_started
    let time_ended = activity.time_ended

    for (let i = 0; i < state.length; i++) {
        if (state[i].time_ended == null || state[i].time_ended == 'null')
            continue

        if (
            (state[i].time_started <= time_started &&
                state[i].time_ended >= time_started) ||
            (state[i].time_started <= time_ended &&
                state[i].time_ended >= time_ended)
        ) {
            if (overlaps.Sleep.includes(activity.activity_type)) {
                return true
            }

            return false
        }
    }
}
