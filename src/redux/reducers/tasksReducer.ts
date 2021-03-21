import { tasksAsyncSave } from '../../services/asyncStorage'
import Task, { addOrUpdate, exists, sort } from '../../classes/Task'
import { scheduleSync } from '../../services/connectivityWatcher'
import { ITask, ITaskClass } from '../../classes/Task'
import { IActivity } from '../../classes/Activity'
import {
    REPLACE_TASKS,
    TASK_COMPLETE,
    TASKS_FETCH_FAILED,
    ADD_ACTIVITY,
    LOGOUT_USER,
    TASK_SET_NOTIFICATIONS,
    TASK_DELAY_NOTIFICATION,
    TASK_CANCEL_NOTIFICATION,
} from '../types'
import {
    scheduleNotification,
    cancelLocalNotification,
    cancelAllLocalNotifications,
} from '../../notifications/notifications'
import { strings } from '../../localization'

export type TaskActions = {
    type: string
    payload: ITaskClass[] & ITaskClass & IActivity
}

export default function tasksReducer(
    state: ITaskClass[] = [],
    { type, payload }: TaskActions,
) {
    switch (type) {
        case REPLACE_TASKS:
            state = payload.map((task: ITaskClass) => {
                task = new Task({ ...task })
                addOrUpdate(state, task)
                return task
            })

            state = sort(state)
            save(state)
            return state
        case TASK_COMPLETE:
            const task = state.find(({ _id }) => _id === payload._id)
            if (task) {
                task.complete()
                addOrUpdate(state, task)
            }
            save(state)
            return state
        case TASKS_FETCH_FAILED:
            scheduleSync()
            return state
        case ADD_ACTIVITY:
            if (payload.task) {
                const task = state.find(({ _id }) => _id === payload.task)
                if (task) {
                    task.complete()
                    addOrUpdate(state, task)
                }
            }
            save(state)
            return state
        case TASK_SET_NOTIFICATIONS:
            payload.setNotification()
            addOrUpdate(state, payload)
            return state
        case TASK_DELAY_NOTIFICATION:
            payload.delayNotification()
            addOrUpdate(state, payload)
            return state
        case TASK_CANCEL_NOTIFICATION:
            payload.cancelNotification()
            addOrUpdate(state, payload)
            return state
        case LOGOUT_USER:
            cancelAllLocalNotifications()
            return []
        default:
            return state
    }
}

function save(state: ITaskClass[]) {
    tasksAsyncSave(state)
}
