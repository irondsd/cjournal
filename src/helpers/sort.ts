import { IActivity } from '../classes/Activity'

export function sortActivities(array: IActivity[]): IActivity[] {
    function compare(a: IActivity, b: IActivity) {
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
