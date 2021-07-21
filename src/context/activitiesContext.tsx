import React, { createContext, useReducer, useContext } from 'react'
import { IActivity } from '../classes/Activity'
import { ActivityTypes } from '../constants'

const defaultState: Activities = {}

type Activities = {
    [_id: string]: IActivity
}

type ActivityFunctions = {
    activitiesRestore?: (activities: Activities) => void
    loadActivitiesFromArray?: (activities: IActivity[]) => void
    activityDelete?: (activity: IActivity) => void
    activityAddOrUpdate?: (activity: IActivity) => void
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

function activitiesReducer(state, { type, payload }): Activities {
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
        case 'ADD_OR_UPDATE': {
            const newState: Activities = { ...state }
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
        case 'SYNCED': {
            const newState: Activities = { ...state }
            const { _id } = payload
            delete newState[_id].system
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
    const loadActivitiesFromArray = (activities: IActivity[]) => {
        activitiesDispatch({ type: 'LOAD_ARRAY', payload: activities })
    }
    const activityDelete = (activity: IActivity) => {
        activitiesDispatch({ type: 'DELETE', payload: activity })
    }
    const activityAddOrUpdate = (activity: IActivity) => {
        activitiesDispatch({ type: 'ADD_OR_UPDATE', payload: activity })
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
        loadActivitiesFromArray,
        activityDelete,
        activityAddOrUpdate,
        activitiesReset,
        activitySynced,
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
