import store from '../store'
import { addActivity } from '../actions'
import { showToast, showError } from './toast'
import { strings } from '../localizations'
import { overlappingGreying } from './activityOverlap'
import Activity from '../classes/Activity'

let clicked = false

export function activityInstantSave(activity_type) {
    if (!clicked) {
        clicked = true
        setTimeout(() => {
            clicked = false
        }, 500)
        let activity = Activity.instantInit(activity_type)
        let overlaps = overlappingGreying(store.getState().activity, activity.activity_type)
        if (overlaps) {
            showError(strings.OverlapMsg)
        } else {
            store.dispatch(addActivity(activity))
        }
    }
}
