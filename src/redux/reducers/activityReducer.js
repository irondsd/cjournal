import { Platform } from 'react-native'
import { activityAsyncSave } from '../../services/asyncStorage'
import { sortActivities } from '../../helpers/sort'
import { showError, showToast } from '../../services/toast'
import { strings } from '../../localization'
import Activity, {
    exists,
    addOrUpdate,
    sort,
    remove,
    update,
} from '../../classes/Activity'
import { scheduleSync } from '../../services/connectivityWatcher'

// TODO: activityArray class

export default function activityReducer(state = [], { type, payload }) {
    switch (type) {
        case 'REPLACE_ACTIVITIES':
            state = payload.map(activity => {
                return new Activity({ ...activity })
            })
            save(state)
            return state

        case 'ADD_ACTIVITY':
            let activity = new Activity({ ...payload })
            if (activity.hasFiles()) activity.system.upload = true

            addOrUpdate(state, activity)
            showToast(`${strings.Saved} ${strings[activity.activity_type]}!`)
            state = sort(state)
            save(state)
            return state
        case 'UPDATE_ACTIVITIES':
            if (!state) state = []
            state = [
                ...state.filter(activity => {
                    return !activity.synced()
                }),
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

        case 'UPDATE_ACTIVITY':
            if (!state) state = []
            update(state, payload[0], payload[1])
            showToast(`${strings.Saved} ${strings[payload[1].activity_type]}!`)
            state = sort(state)
            save(state)
            return state
        case 'DELETE_ACTIVITY':
            if (payload.system) {
                payload.system.awaitsDelete = true
            } else {
                payload.system = { awaitsDelete: true }
            }

            save(state)
            return state
        case 'ACTIVITY_SET_ID':
            payload.activity.setId(payload._id)
            save(state)
            return state
        case 'ACTIVITY_SYNC_FAILED':
            payload.increaseFailedSyncCount()
            save(state)
            scheduleSync()
            return state
        case 'ACTIVITY_FETCH_FAILED':
            scheduleSync()
            return state
        case 'ACTIVITY_SYNCED':
            payload.successfullySynced()
            save(state)
            return state
        case 'ACTIVITY_DELETED':
            state = remove(state, payload)
            save(state)
            return state
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

function save(state) {
    activityAsyncSave(state)
}