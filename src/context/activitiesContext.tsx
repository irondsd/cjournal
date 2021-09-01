import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
    useState,
} from 'react'
import { IActivity } from '../classes/Activity'
import { strings } from '../localization'
import { activitiesAsyncSave } from '../services/asyncStorage'
import { showToast } from '../services/toast'
import timestamp from '../helpers/timestamp'

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
    { activities: Activities; sorted: IActivity[] } & ActivityFunctions
>({
    activities: defaultState,
    sorted: [],
})

function activitiesReducer(
    state: Activities,
    { type, payload }: { type: Actions; payload: any },
): Activities {
    console.log('Activities call:', Actions[type])

    switch (type) {
        case Actions.RESTORE: {
            return payload
        }
        case Actions.LOAD_ARRAY: {
            const newState: Activities = {}

            // preserve ones there were not synced yet
            for (const _id in state) {
                if (state[_id].system) {
                    const activity = state[_id]
                    newState[_id] = activity
                }
            }

            payload.forEach((a: IActivity) => {
                // check if current activity is newer
                if (state[a._id].updated_at > a.updated_at)
                    newState[a._id] = state[a._id]
                else newState[a._id] = a
            })

            return newState
        }
        case Actions.ADD: {
            // todo check for files and set upload
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.system.awaitsSync = true

            if (!activity.user) {
                console.log('ERROR: activity added without user')
                console.log(activity)
                return state
            }

            newState[activity._id] = activity
            return newState
        }
        case Actions.UPDATE: {
            // todo check for files and set upload
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.updated_at = timestamp()
            activity.system.awaitsEdit = true
            newState[activity._id] = activity
            return newState
        }
        case Actions.DELETE: {
            const newState: Activities = { ...state }
            const activity: IActivity = payload
            if (!activity.system) activity.system = {}
            activity.updated_at = timestamp()
            activity.system.awaitsDelete = true
            newState[activity._id] = activity
            return newState
        }
        case Actions.SYNCED: {
            const newState: Activities = { ...state }

            const { _id } = payload
            const activity = newState[_id]
            if (activity) delete activity.system

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
            const activity = newState[_id]
            if (activity) delete activity.system

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
    const [sorted, setSorted] = useState<IActivity[]>([])

    const activitiesRestore = (activities: Activities) => {
        activitiesDispatch({ type: Actions.RESTORE, payload: activities })
    }
    const activitiesLoadFromArray = (activities: IActivity[]) => {
        activitiesDispatch({ type: Actions.LOAD_ARRAY, payload: activities })
    }
    const activityDelete = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.DELETE, payload: activity })
        showToast(`${strings.Deleted} ${strings[activity.activity_type]}!`)
    }
    const activityAdd = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.ADD, payload: activity })
        showToast(`${strings.Saved} ${strings[activity.activity_type]}!`)
    }
    const activityUpdate = (activity: IActivity) => {
        activitiesDispatch({ type: Actions.UPDATE, payload: activity })
        showToast(`${strings.Saved} ${strings[activity.activity_type]}!`)
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
        sorted,
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

        const array = Object.values(activities)
        const sorted = array.sort(function (a, b) {
            return b['time_started'] - a['time_started']
        })

        setSorted(sorted)
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
