import timestamp from '../helpers/timestamp'
import {
    cancelLocalNotification,
    scheduleNotification,
} from '../notifications/notifications'
import { delayNotificationBy } from '../constants'
import { strings } from '../localization'
import { taskCancelNotification } from '../redux/actions'

export interface ITask {
    _id: string
    activity_type: string
    time: number
    completed: boolean
    last_updated: number
    data: any
    notification?: INotification
}

export interface INotification {
    id: number
    time: number
    delayed?: number
}

export interface ITaskClass extends ITask {
    isEqual: (other: ITask) => boolean
    complete: () => void
    uncomplete: () => void
    isCompleted: () => boolean
    isNewerThan: (other: ITask) => boolean
    setNotification: (time?: number) => void
    delayNotification: () => void
    cancelNotification: () => void
}

export default class Task implements ITaskClass {
    _id: string
    activity_type: string
    time: number
    completed: boolean
    last_updated: number
    data: any
    notification?: any

    constructor(task: ITask) {
        this._id = task._id
        this.activity_type = task.activity_type
        this.time = task.time
        this.completed = task.completed
        this.last_updated = task.last_updated
        this.data = task.data
        this.notification = task.notification
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

    setNotification(time: number | undefined) {
        scheduleNotification(
            this.activity_type,
            strings.notifText,
            time || this.time,
        )
        this.notification = {
            time: time || this.time,
            delayed: 0,
        }
    }

    delayNotification() {
        const time = this.notification.time + delayNotificationBy
        taskCancelNotification(this.notification.id)
        scheduleNotification(this.activity_type, strings.notifText, time)
        // schedule
        this.notification = {
            time: time,
            delayed: this.notification.delayed + 1,
        }
    }

    cancelNotification() {
        taskCancelNotification(this)
        cancelLocalNotification(this.notification.id)
        delete this.notification
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
