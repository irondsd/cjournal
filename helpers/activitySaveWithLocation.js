import store from '../redux/store'
import { addActivity, updateActivity } from '../redux/actions'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'
import Activity from '../classes/Activity'
import { activityTypes } from '../constants'

let clicked = false
export function activitySaveWithLocation(activity_type) {
    if (!clicked) {
        clicked = true
        setTimeout(() => {
            clicked = false
        }, 500)
        let idinv = store.getState().user.idinv
        let activity = Activity.instantInit(activity_type, idinv)
        activity
            .attachLocation()
            .then(() => {
                actualize(activity)
            })
            .catch(err => {
                console.log('location error', err)

                setTimeout(() => {
                    console.log('retrying location')
                    activity
                        .attachLocation()
                        .then(() => {
                            actualize(activity)
                        })
                        .catch(() => {
                            console.log('location error 2')

                            setTimeout(() => {
                                console
                                    .log('retrying location')
                                    .attachLocation()
                                    .then(() => {
                                        actualize(activity)
                                    })
                                    .catch(() => {
                                        console.log('location error 3')
                                    })
                            }, 60000)
                        })
                }, 60000)
            })
        store.dispatch(addActivity(activity))
    }
}

function actualize(activity) {
    let actualActivity
    // in case activity is already synced, we need to get it's id
    console.log('counting')
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
