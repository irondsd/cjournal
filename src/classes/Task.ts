import timestamp from '../helpers/timestamp'

export interface ITask {
    _id: string
    activity_type: string
    time: number
    completed: boolean
    last_updated: number
    data: any
    notification?: any
}

export interface INotification {
    time: number
    delayed?: number
}

export interface ITaskClass extends ITask {
    isEqual: (other: ITask) => boolean
    complete: () => void
    uncomplete: () => void
    isCompleted: () => boolean
    isNewerThan: (other: ITask) => boolean
}

export default class Task implements ITaskClass {
    _id: string
    activity_type: string
    time: number
    completed: boolean
    last_updated: number
    data: any
    notification?: any

    constructor(
        _id: string,
        activity_type: string,
        time: number,
        completed: boolean,
        last_updated: number,
        data: any,
        notification?: any,
    ) {
        this._id = _id
        this.activity_type = activity_type
        this.time = time
        this.completed = completed
        this.last_updated = last_updated
        this.data = data
        this.notification = notification
    }

    isEqual(other: ITask): boolean {
        if (this._id === other._id && this._id !== null) return true
        if (this.activity_type !== other.activity_type) return false
        if (this.time !== other.time) return false
        return true
    }

    complete() {
        this.completed = true
        this.last_updated = timestamp()
    }

    uncomplete() {
        this.completed = false
        this.last_updated = timestamp()
    }

    isCompleted(): boolean {
        return !!this.completed
    }

    isNewerThan(other: ITask): boolean {
        return this.last_updated > other.last_updated
    }
}

export function taskExists(array: ITaskClass[], task: ITaskClass) {
    for (const element of array) {
        if (task.isEqual(element)) {
            // exists
            return true
        }
    }
    return false
}

export function addOrUpdate(
    array: ITaskClass[],
    task: ITaskClass,
): ITaskClass[] {
    for (let element of array) {
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

export function exists(array: ITaskClass[], task: ITaskClass) {
    for (const element of array) {
        if (task.isEqual(element)) {
            // found
            return true
        }
    }
    // not found
    return false
}

export function sort(array: ITaskClass[]): ITaskClass[] {
    function compare(a: ITask, b: ITask) {
        if (a.time > b.time) return -1
        if (a.time < b.time) return 1
        return 0
    }

    return array.sort(compare)
}

export function findLatestTask(
    array: ITaskClass[],
    activity_type: string,
): string | undefined {
    let _id

    if (!Array.isArray(array)) return

    for (const task of array) {
        if (task.activity_type === activity_type) {
            if (timestamp() + 3600 > task.time) {
                _id = task._id
                break
            }
        }
    }

    return _id
}

export function findTaskById(
    array: ITaskClass[],
    _id: string,
): ITask | undefined {
    return array.find(task => task._id === _id)
}