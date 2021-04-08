import { activityAsyncSave } from '../../services/asyncStorage'
import { showToast } from '../../services/toast'
import { strings } from '../../localization'
import Activity, {
    exists,
    addOrUpdate,
    sort,
    remove,
} from '../../classes/Activity'
import { scheduleSync } from '../../services/connectivityWatcher'
import {
    REPLACE_ACTIVITIES,
    ADD_ACTIVITY,
    UPDATE_ACTIVITIES,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    ACTIVITY_SYNC_FAILED,
    ACTIVITY_FETCH_FAILED,
    ACTIVITY_SYNCED,
    ACTIVITY_DELETED,
    LOGOUT_USER,
} from '../types'
import { IActivityClass } from '../../classes/Activity'

export type ActivityAction = {
    type: string
    payload: IActivityClass[] & IActivityClass
}

export default function activityReducer(
    state: IActivityClass[] = [],
    { type, payload }: ActivityAction,
) {
    switch (type) {
        case REPLACE_ACTIVITIES:
            state = payload.map(activity => {
                return new Activity({ ...activity })
            })
            save(state)
            return state

        case ADD_ACTIVITY:
            let activity = new Activity({ ...payload })
            if (activity.hasFiles()) {
                if (!activity.system) activity.system = {}
                activity.system.upload = true
            }

            addOrUpdate(state, activity)
            showToast(`${strings.Saved} ${strings[activity.activity_type]}!`)
            state = sort(state)
            save(state)
            return state
        case UPDATE_ACTIVITIES:
            if (!state) state = []
            state = [
                ...state.filter(activity => !activity.synced()),
                ...payload.map(activity => {
                    activity = new Activity({ ...activity })
                    state = addOrUpdate(state, activity)
                    return activity
                }),
            ]

            state = state.filter(activity => {
                return exists(payload, activity)
            })

            state = sort(state)
            save(state)
            return state

        case UPDATE_ACTIVITY:
            const index = state.findIndex(a => a._id === payload._id)
            state[index] = payload
            showToast(`${strings.Saved} ${strings[payload.activity_type]}!`)
            state = sort(state)
            save(state)
            return state
        case DELETE_ACTIVITY:
            if (payload.system) {
                payload.system.awaitsDelete = true
            } else {
                payload.system = { awaitsDelete: true }
            }

            save(state)
            return state
        case ACTIVITY_SYNC_FAILED:
            payload.increaseFailedSyncCount()
            save(state)
            scheduleSync()
            return state
        case ACTIVITY_FETCH_FAILED:
            scheduleSync()
            return state
        case ACTIVITY_SYNCED:
            payload.successfullySynced()
            save(state)
            return state
        case ACTIVITY_DELETED:
            state = remove(state, payload)
            save(state)
            return state
        case LOGOUT_USER:
            return []
        default:
            return state
    }
}

function save(state: IActivityClass[]) {
    activityAsyncSave(state)
}
