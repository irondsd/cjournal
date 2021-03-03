import timestamp from '../helpers/timestamp'

export default class Task {
    constructor(_id, activity_type, time, completed, last_updated, data) {
        this._id = _id
        this.activity_type = activity_type
        this.time = time
        this.completed = completed
        this.last_updated = last_updated
        this.data = data
    }

    isEqual(other) {
        if (this._id === other._id && this._id !== null) return true
        if (this.activity_type !== other.activity_type) return false
        if (this.time !== other.time) return false
        return true
    }

    complete() {
        this.completed = 1
        this.last_updated = (new Date().getTime() + '').substring(0, 10)
    }

    uncomplete() {
        this.completed = 0
        this.last_updated = (new Date().getTime() + '').substring(0, 10)
    }

    isCompleted() {
        return !!this.completed
    }

    isNewerThan(other) {
        return this.last_updated > other.last_updated
    }
}

export function taskExists(array, task) {
    for (element of array) {
        if (task.isEqual(element)) {
            // exists
            return true
        }
    }
    return false
}

export function addOrUpdate(array, task) {
    for (element of array) {
        if (task.isEqual(element)) {
            // found
            if (task.isNewerThan(element)) {
                // task is newer, updating
                element = task
                return array
            }
        }
    }
    // not found
    array.push(task)
    return array
}

export function exists(array, task) {
    for (element of array) {
        if (task.isEqual(element)) {
            // found
            return true
        }
    }
    // not found
    return false
}

export function sort(array) {
    function compare(a, b) {
        if (a.time > b.time) return -1
        if (a.time < b.time) return 1
        return 0
    }

    return array.sort(compare)
}

export function findLatestTask(array, activity_type) {
    let _id = null

    if (!Array.isArray(array)) return null

    for (task of array) {
        if (task.activity_type === activity_type) {
            if (timestamp() + 3600 > task.time) {
                _id = task._id
                break
            }
        }
    }

    return _id
}

export function findTaskById(array, _id) {
    const task = array.find(task => task._id === id)
    if (task) return task
    return null
}
