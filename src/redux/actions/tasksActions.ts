import {
    REPLACE_TASKS,
    TASK_COMPLETE,
    TASKS_FETCH_FAILED,
    LOGOUT_USER,
    TASK_SET_NOTIFICATIONS,
    TASK_CANCEL_NOTIFICATION,
    TASK_DELAY_NOTIFICATION,
} from '../types'
import { ITask } from '../../classes/Task'

export const replaceTasks = (tasks: ITask[]) => {
    return {
        type: REPLACE_TASKS,
        payload: tasks,
    }
}

export const taskSetNotification = (task: ITask) => {
    return {
        type: TASK_SET_NOTIFICATIONS,
        payload: task,
    }
}

export const taskNotificationFired = (task: ITask) => {
    return {
        type: TASK_NOTIFICATIONS_FIRED,
        payload: task,
    }
}

export const taskDelayNotification = (task: ITask) => {
    return {
        type: TASK_DELAY_NOTIFICATION,
        payload: task,
    }
}

export const taskCancelNotification = (task: ITask) => {
    return {
        type: TASK_CANCEL_NOTIFICATION,
        payload: task,
    }
}

export const taskComplete = (task: ITask) => {
    return {
        type: TASK_COMPLETE,
        payload: task,
    }
}

export const tasksFetchFailed = () => {
    return {
        type: TASKS_FETCH_FAILED,
    }
}

export const logoutUserTasks = () => {
    return {
        type: LOGOUT_USER,
    }
}
