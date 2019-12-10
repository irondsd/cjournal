export function sortActivities(array) {
    function compare(a, b) {
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

// export function sortTasks(array) {
//     function compare(a, b) {
//         if (a.time > b.time) return -1
//         if (a.time < b.time) return 1
//         return 0
//     }

//     return array.sort(compare)
// }

export function sortNumbers(array) {
    function compare(a, b) {
        return a - b
    }

    return array.sort(compare)
}
