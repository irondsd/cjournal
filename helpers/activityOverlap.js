import { overlaps } from '../properties'

export function overlappingGreying(state, activityName) {
    dateTime = (new Date().getTime() + '').substring(0, 10)

    for (let i = 0; i < state.length; i++) {
        if (state[i].time_ended == null || state[i].time_ended == 'null') continue
        if (!Object.keys(overlaps).includes(activityName)) continue

        if (state[i].time_started < dateTime && state[i].time_ended > dateTime) {
            // console.log(overlaps[activityName].includes(state[i].activity_type))
            // console.log(state[i].activity_type)
            if (overlaps[activityName].includes(state[i].activity_type)) {
                return true
            }
        }
    }
    // console.log('no conflict')
    return false
}
