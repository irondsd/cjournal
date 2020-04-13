import store from '../redux/store'
import { addActivity, updateActivity } from '../redux/actions'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'
import Activity from '../classes/Activity'
import { activityTypes } from '../constants'

let clicked = false

// TODO: merge with activity class

export function activitySaveWithLocation(activity_type) {
    if (!clicked) {
        clicked = true
        setTimeout(() => {
            clicked = false
        }, 5000)
        let idinv = store.getState().user.idinv
        let activity = Activity.instantInit(activity_type, idinv)

        activity
            .attachLocation()
            .then(() => {
                actualize(activity)
            })
            .catch(err => {
                // error, retrying
                console.log('error')

                setTimeout(() => {
                    // retry 1
                    if (!retry(activity)) {
                        setTimeout(() => {
                            // retry 2
                            if (!retry(activity)) {
                                setTimeout(() => {
                                    // retry 3
                                    if (!retry(activity)) {
                                        setTimeout(() => {
                                            retry(activity)
                                        }, 60000)
                                    }
                                }, 60000)
                            }
                        }, 60000)
                    }
                }, 60000)
            })
        store.dispatch(addActivity(activity))
    }
}

function retry(activity) {
    activity
        .attachLocation()
        .then(() => {
            actualize(activity)
            return true
        })
        .catch(() => {
            return false
        })
}

function actualize(activity) {
    let actualActivity
    // in case activity is already synced, we need to get it's id
    for (item of store.getState().activity) {
        if (item.activity_type === activityTypes.Alarm) {
            actualActivity = item
            break
        }
    }

    if (actualActivity && actualActivity.id) {
        activity.id = actualActivity.id
        activity.setToUpdate()
        store.dispatch(updateActivity(actualActivity, activity))
    } else {
        store.dispatch(updateActivity(activity, activity))
    }
}
