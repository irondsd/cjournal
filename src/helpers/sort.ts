import { Activity } from '../classes/Activity'

export function sortActivities(array: Activity[]): Activity[] {
    function compare(a: Activity, b: Activity) {
        if (a.time_started > b.time_started) {
            return -1
        }
        if (a.time_started < b.time_started) {
            return 1
        }
        return 0
    }

    return array.sort(compare)
}

export function sortNumbers(array: number[]): number[] {
    function compare(a: number, b: number) {
        return a - b
    }

    return array.sort(compare)
}
