import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Task } from '../types/Task'
import timestamp from '../helpers/timestamp'
import { tasksAsyncSave } from '../services/asyncStorage'

const defaultState: Tasks = {}

export type Tasks = {
    [_id: string]: Task
}

type TaskFunctions = {
    tasksRestore?: (tasks: Tasks) => void
    loadTasksFromArray?: (tasks: Task[]) => void
    TaskComplete?: (task: Task) => void
    taskAddOrUpdate?: (task: Task) => void
    tasksReset?: () => void
    TaskCompleted?: (task: Task) => void
}

const TasksContext = createContext<
    { tasks: Tasks; sorted: Task[] } & TaskFunctions
>({
    tasks: defaultState,
    sorted: [],
})

enum Actions {
    RESTORE,
    LOAD_ARRAY,
    COMPLETE,
    RESET,
}

function tasksReducer(
    state: Tasks,
    { type, payload }: { type: Actions; payload: any },
): Tasks {
    switch (type) {
        case Actions.RESTORE: {
            return payload
        }
        case Actions.LOAD_ARRAY: {
            const newState: Tasks = {}

            payload.forEach((t: Task) => {
                newState[t._id] = t
            })

            return newState
        }
        case Actions.COMPLETE: {
            const newState: Tasks = { ...state }
            const { _id } = payload
            newState[_id].completed = true
            newState[_id].updated_at = timestamp()

            return newState
        }
        case Actions.RESET: {
            return defaultState
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

const TasksProvider: FC = ({ children }) => {
    const [tasks, tasksDispatch] = useReducer(tasksReducer, defaultState)
    const [sorted, setSorted] = useState<Task[]>([])

    const tasksRestore = (tasks: Tasks) => {
        tasksDispatch({ type: Actions.RESTORE, payload: tasks })
    }
    const loadTasksFromArray = (tasks: Task[]) => {
        tasksDispatch({ type: Actions.LOAD_ARRAY, payload: tasks })
    }
    const TaskComplete = (task: Task) => {
        tasksDispatch({ type: Actions.COMPLETE, payload: task })
    }
    const tasksReset = () => {
        tasksDispatch({ type: Actions.RESET, payload: undefined })
    }

    const value = {
        tasks,
        sorted,
        tasksRestore,
        loadTasksFromArray,
        TaskComplete,
        tasksReset,
    }

    useEffect(() => {
        const array = Object.values(tasks)
        const filtered = array.filter(t => !t.completed)
        const sorted = filtered.sort(function (a, b) {
            return b['time'] - a['time']
        })

        setSorted(sorted)
        tasksAsyncSave(tasks)
    }, [tasks])

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    )
}

function useTasks() {
    const context = useContext(TasksContext)

    return context
}

export { TasksProvider, useTasks }
