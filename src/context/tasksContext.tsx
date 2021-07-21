import React, { createContext, useReducer, useContext } from 'react'
import { ITask } from '../classes/Task'

const defaultState: Tasks = {}

type Tasks = {
    [_id: string]: ITask
}

type TasksFunctions = {
    tasksRestore?: (tasks: Tasks) => void
    loadTasksFromArray?: (tasks: ITask[]) => void
    taskComplete?: (task: ITask) => void
    tasksReset?: () => void
}

const TasksContext = createContext<{ tasks: Tasks } & TasksFunctions>({
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
        case 'ADD_OR_UPDATE': {
            const newState: Tasks = { ...state }
            newState[payload._id] = payload
            return newState
        }
        case 'DELETE': {
            const newState = { ...state }
            const { _id } = payload

            if (!newState[_id].system) newState[_id].system = {}
            newState[_id].system.awaitsDelete = true

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
    const taskComplete = (task: ITask) => {
        tasksDispatch({ type: 'DELETE', payload: task })
    }
    const tasksReset = () => {
        tasksDispatch({ type: 'RESET', payload: undefined })
    }

    const value = {
        tasks,
        tasksRestore,
        loadTasksFromArray,
        taskComplete,
        tasksReset,
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
