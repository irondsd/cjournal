import React, { createContext, useReducer, useContext } from 'react'
import { IActivity } from '../classes/Activity'
import { ActivityTypes } from '../constants'

const defaultState: Activities = {}

type Activities = {
    [_id: string]: IActivity
}

type ActivityFunctions = {
    activitiesRestore?: (activities: Activities) => void
    activitiesLoadFromArray?: (activities: IActivity[]) => void
    activityDelete?: (activity: IActivity) => void
    activityAdde?: (activity: IActivity) => void
    activityUpdate?: (activity: IActivity) => void
    activitiesReset?: () => void
    activitySynced?: (activity: IActivity) => void
    activityDeleted?: (activity: IActivity) => void
    activitySyncFailed?: (activity: IActivity) => void
}

const ActivitiesContext = createContext<
    { activities: Activities } & ActivityFunctions
>({
    activities: defaultState,
})

function activitiesReducer(state: Activities, { type, payload }): Activities {
    switch (type) {
        case 'RESTORE': {
            return payload
        }
        case 'LOAD_ARRAY': {
            const newState: Activities = {}

            payload.forEach(a => {
                newState[a._id] = a
            })

            return newState
        }
        case 'ADD': {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsSync = true
            newState[activity._id] = activity
            return newState
        }
        case 'UPDATE': {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsEdit = true
            newState[activity._id] = activity
            return newState
        }
        case 'DELETE': {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsDelete = true
            newState[activity._id] = activity
            return newState
        }
        case 'SYNCED': {
            const newState: Activities = { ...state }
            const { _id } = payload
            delete newState[_id].system
            return newState
        }
        case 'SYNC_FAILED': {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            if (!activity.system.failedSyncs) activity.system.failedSyncs = 0
            activity.system.failedSyncs += 1
            newState[activity._id] = activity
            return newState
        }
        case 'DELETED': {
            const newState = { ...state }
            const { _id } = payload

            delete newState[_id]

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

function ActivitiesProvider({ children }) {
    const [activities, activitiesDispatch] = useReducer(
        activitiesReducer,
        defaultState,
    )

    const activitiesRestore = (activities: Activities) => {
        activitiesDispatch({ type: 'RESTORE', payload: activities })
    }
    const activitiesLoadFromArray = (activities: IActivity[]) => {
        activitiesDispatch({ type: 'LOAD_ARRAY', payload: activities })
    }
    const activityDelete = (activity: IActivity) => {
        activitiesDispatch({ type: 'DELETE', payload: activity })
    }
    const activityAdd = (activity: IActivity) => {
        activitiesDispatch({ type: 'ADD', payload: activity })
    }
    const activityUpdate = (activity: IActivity) => {
        activitiesDispatch({ type: 'UPDATE', payload: activity })
    }
    const activitiesReset = () => {
        activitiesDispatch({ type: 'RESET', payload: undefined })
    }
    const activitySynced = (activity: IActivity) => {
        activitiesDispatch({ type: 'SYNCED', payload: activity })
    }
    const activityDeleted = (activity: IActivity) => {
        activitiesDispatch({ type: 'DELETED', payload: activity })
    }
    const activitySyncFailed = (activity: IActivity) => {
        activitiesDispatch({ type: 'SYNC_FAILED', payload: activity })
    }

    const value = {
        activities,
        activitiesRestore,
        activitiesLoadFromArray,
        activitiesReset,
        activitySynced,
        activityAdd,
        activityUpdate,
        activityDelete,
        activityDeleted,
        activitySyncFailed,
    }
    return (
        <ActivitiesContext.Provider value={value}>
            {children}
        </ActivitiesContext.Provider>
    )
}

function useActivities() {
    const context = useContext(ActivitiesContext)

    return context
}

export { ActivitiesProvider, useActivities }
