import store from '../redux/store'
import { addActivity, updateActivity } from '../redux/actions'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'
import Activity from '../classes/Activity'

let clicked = false

export function activityAlarmSave(activity_type) {
    if (!clicked) {
        clicked = true
        setTimeout(() => {
            clicked = false
        }, 500)
        let activity = Activity.instantInit(activity_type)
        activity.attachLocation().then(() => {
            store.dispatch(updateActivity(activity, activity))
        })
        store.dispatch(addActivity(activity))
    }
}
