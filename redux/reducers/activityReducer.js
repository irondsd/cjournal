import { Platform } from 'react-native'
import { activityAsyncSave } from '../../services/asyncStorage'
import { sortActivities } from '../../helpers/sort'
import { showError, showToast } from '../../services/toast'
import { strings } from '../../localizations'
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
                return new Activity(
                    activity.id,
                    activity.activity_type,
                    activity.time_started,
                    activity.time_ended,
                    activity.utc_offset,
                    activity.tasks_id,
                    activity.idinv,
                    activity.last_updated,
                    activity.comment,
                    activity.data,
                    activity.system,
                )
            })
            save(state)
            return state

        case 'ADD_ACTIVITY':
            let activity = new Activity(
                payload.id,
                payload.activity_type,
                payload.time_started,
                payload.time_ended,
                payload.utc_offset,
                payload.tasks_id,
                payload.idinv,
                payload.last_updated,
                payload.comment,
                payload.data,
                payload.system,
            )
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
                    activity = new Activity(
                        activity.id,
                        activity.activity_type,
                        activity.time_started,
                        activity.time_ended,
                        activity.utc_offset,
                        activity.tasks_id,
                        activity.idinv,
                        activity.last_updated,
                        activity.comment,
                        activity.data,
                        {},
                        activity.idinv,
                    )
                    addOrUpdate(state, activity)
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
            payload.activity.setId(payload.id)
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
