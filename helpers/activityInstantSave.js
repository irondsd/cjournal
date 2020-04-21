import store from '../redux/store'
import { addActivity } from '../redux/actions'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'
import Activity from '../classes/Activity'
import { defaultDurations } from '../constants'

let clicked = false

// TODO: merge with activity class

export function activityInstantSave(activity_type) {
    if (!clicked) {
        clicked = true
        setTimeout(() => {
            clicked = false
        }, 1000)
        let idinv = store.getState().user.idinv
        let activity = Activity.instantInit(activity_type, idinv)
        store.dispatch(addActivity(activity))
    }
}
