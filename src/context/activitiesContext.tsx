import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { IActivity } from '../classes/Activity'
import { activitiesAsyncSave } from '../services/asyncStorage'

const defaultState: Activities = {}

export type Activities = {
    [_id: string]: IActivity
}

type ActivityFunctions = {
    activitiesRestore?: (activities: Activities) => void
    activitiesLoadFromArray?: (activities: IActivity[]) => void
    activityDelete?: (activity: IActivity) => void
    activityAdd?: (activity: IActivity) => void
    activityUpdate?: (activity: IActivity) => void
    activitiesReset?: () => void
    activitySynced?: (activity: IActivity) => void
    activityDeleted?: (activity: IActivity) => void
    activitySyncFailed?: (activity: IActivity) => void
}

enum Actions {
    RESTORE,
    LOAD_ARRAY,
    ADD,
    UPDATE,
    DELETE,
    SYNCED,
    SYNC_FAILED,
    DELETED,
    RESET,
}

const ActivitiesContext = createContext<
    { activities: Activities } & ActivityFunctions
>({
    activities: defaultState,
})

function activitiesReducer(
    state: Activities,
    { type, payload }: { type: Actions; payload: any },
): Activities {
    switch (type) {
        case Actions.RESTORE: {
            return payload
        }
        case Actions.LOAD_ARRAY: {
            const newState: Activities = {}

            payload.forEach((a: IActivity) => {
                newState[a._id] = a
            })

            return newState
        }
        case Actions.ADD: {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsSync = true
            newState[activity._id] = activity
            return newState
        }
        case Actions.UPDATE: {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsEdit = true
            newState[activity._id] = activity
            return newState
        }
        case Actions.DELETE: {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsDelete = true
            newState[activity._id] = activity
            return newState
        }
        case Actions.SYNCED: {
            const newState: Activities = { ...state }
            const { _id } = payload
            delete newState[_id].system
            return newState
        }
        case Actions.SYNC_FAILED: {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            if (!activity.system.failedSyncs) activity.system.failedSyncs = 0
            activity.system.failedSyncs += 1

            return newState
        }
        case Actions.DELETED: {
            const newState = { ...state }
            const { _id } = payload

            delete newState[_id]

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

const ActivitiesProvider: FC = ({ children }) => {
    const [activities, activitiesDispatch] = useReducer(
        activitiesReducer,
        defaultState,
    )

    const activitiesRestore = (activities: Activities) => {
        activitiesDispatch({ type: Actions.RESTORE, payload: activities })
    }
    const activitiesLoadFromArray = (activities: IActivity[]) => {
        activitiesDispatch({ type: Actions.LOAD_ARRAY, payload: activities })
    }
    const activityDelete = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.DELETE, payload: activity })
    }
    const activityAdd = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.ADD, payload: activity })
    }
    const activityUpdate = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.UPDATE, payload: activity })
    }
    const activitiesReset = () => {
        activitiesDispatch({ type: Actions.RESET, payload: undefined })
    }
    const activitySynced = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.SYNCED, payload: activity })
    }
    const activityDeleted = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.DELETED, payload: activity })
    }
    const activitySyncFailed = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.SYNC_FAILED, payload: activity })
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

    useEffect(() => {
        if (Object.keys(activities).length) activitiesAsyncSave(activities)
    }, [activities])

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
