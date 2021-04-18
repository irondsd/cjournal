import { tasksAsyncSave } from '../../services/asyncStorage'
import Task, { addOrUpdate, sort } from '../../classes/Task'
import { scheduleSync } from '../../services/connectivityWatcher'
import { ITaskClass } from '../../classes/Task'
import { IActivity } from '../../classes/Activity'
import {
    LOAD_TASKS,
    UPDATE_TASKS,
    TASK_COMPLETE,
    TASKS_FETCH_FAILED,
    ADD_ACTIVITY,
    LOGOUT_USER,
    TASK_SET_NOTIFICATIONS,
    TASK_DELAY_NOTIFICATION,
    TASK_CANCEL_NOTIFICATION,
} from '../types'
import { cancelAllLocalNotifications } from '../../notifications/notifications'
import timestamp from '../../helpers/timestamp'
import { getNearestHalfAnHour } from '../../helpers/dateTime'

export type TaskActions = {
    type: string
    payload: ITaskClass[] & ITaskClass & IActivity
}

export default function tasksReducer(
    state: ITaskClass[] = [],
    { type, payload }: TaskActions,
) {
    switch (type) {
        case LOAD_TASKS:
            state = payload.map((task: ITaskClass) => {
                const newTask = new Task({ ...task })

                makeNotification(newTask)

                return newTask
            })
            state = sort(state)

            save(state)
            return state
        case UPDATE_TASKS:
            for (let i = 0; i < payload.length; i++) {
                const incomingTask = new Task({ ...payload[i] })

                const index = state.findIndex(
                    task => task._id === incomingTask._id,
                )

                if (index !== -1) {
                    // task with this id already exists
                    if (incomingTask.isNewerThan(state[index])) {
                        if (state[index].time !== incomingTask.time) {
                            // if time has changed, we remake notification
                            incomingTask.cancelNotification()
                            makeNotification(incomingTask)
                        }
                        state[index] = incomingTask
                    }
                } else {
                    // new task
                    state.unshift(incomingTask)
                    makeNotification(incomingTask)
                }
            }

            state = sort(state)
            save(state)
            return state
        case TASK_COMPLETE:
            const id = state.findIndex(({ _id }) => _id === payload._id)
            if (id) {
                state[id].complete()
                save(state)
            }
            return state
        case TASKS_FETCH_FAILED:
            scheduleSync()
            return state
        case ADD_ACTIVITY:
            if (payload.task) {
                const id = state.findIndex(({ _id }) => _id === payload.task)
                if (id) {
                    state[id].complete()
                    save(state)
                }
            }
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

function makeNotification(task: ITaskClass): ITaskClass {
    if (task.time > timestamp()) {
        // ahead of now, schedule at the time of notification
        task.setNotification(task.time)
    } else {
        // in the past
        if (task.eligibleForNotification())
            task.setNotification(getNearestHalfAnHour(timestamp()))
    }

    return task
}
