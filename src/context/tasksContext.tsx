import React, { createContext, useReducer, useContext } from 'react'
import { ITask } from '../classes/Task'
import timestamp from '../helpers/timestamp'

const defaultState: Tasks = {}

type Tasks = {
    [_id: string]: ITask
}

type TaskFunctions = {
    tasksRestore?: (tasks: Tasks) => void
    loadTasksFromArray?: (tasks: ITask[]) => void
    TaskComplete?: (task: ITask) => void
    taskAddOrUpdate?: (task: ITask) => void
    tasksReset?: () => void
    taskSynced?: (task: ITask) => void
    TaskCompleted?: (task: ITask) => void
    taskSyncFailed?: (task: ITask) => void
}

const TasksContext = createContext<{ tasks: Tasks } & TaskFunctions>({
    tasks: defaultState,
})

function tasksReducer(state, { type, payload }): Tasks {
    switch (type) {
        case 'RESTORE': {
            return payload
        }
        case 'LOAD_ARRAY': {
            const newState: Tasks = {}

            payload.forEach(a => {
                newState[a._id] = a
            })

            return newState
        }
        case 'COMPLETE': {
            const newState: Tasks = { ...state }
            const { _id } = payload
            newState[_id].completed = true
            newState[_id].updated_at = timestamp()

            return newState
        }
        case 'SYNC_FAILED': {
            const newState = { ...state }
            const { _id } = payload

            if (!newState[_id].system) newState[_id].system = {}
            if (!newState[_id].system.failedSyncs)
                newState[_id].system.failedSyncs = 0
            newState[_id].system.failedSyncs += 1

            return newState
        }
        case 'RESET': {
            return defaultState
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

function TasksProvider({ children }) {
    const [tasks, tasksDispatch] = useReducer(tasksReducer, defaultState)

    const tasksRestore = (tasks: Tasks) => {
        tasksDispatch({ type: 'RESTORE', payload: tasks })
    }
    const loadTasksFromArray = (tasks: ITask[]) => {
        tasksDispatch({ type: 'LOAD_ARRAY', payload: tasks })
    }
    const TaskComplete = (task: ITask) => {
        tasksDispatch({ type: 'COMPLETE', payload: task })
    }
    const tasksReset = () => {
        tasksDispatch({ type: 'RESET', payload: undefined })
    }
    const taskSynced = (task: ITask) => {
        tasksDispatch({ type: 'SYNCED', payload: task })
    }
    const taskSyncFailed = (task: ITask) => {
        tasksDispatch({ type: 'SYNC_FAILED', payload: task })
    }

    const value = {
        tasks,
        tasksRestore,
        loadTasksFromArray,
        TaskComplete,
        tasksReset,
        taskSynced,
        taskSyncFailed,
    }
    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    )
}

function useTasks() {
    const context = useContext(TasksContext)

    return context
}

export { TasksProvider, useTasks }
