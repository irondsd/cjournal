import store from '../redux/store'
import { addActivity, updateActivity } from '../redux/actions'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'
import Activity from '../classes/Activity'

let clicked = false
// TODO: fix double
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
                store.dispatch(updateActivity(activity, activity))
            })
            .catch(() => {
                console.log('location error')

                setTimeout(() => {
                    console.log('retrying location')
                    activity
                        .attachLocation()
                        .then(() => {
                            store.dispatch(updateActivity(activity, activity))
                        })
                        .catch(() => {
                            console.log('location error 2')

                            setTimeout(() => {
                                console
                                    .log('retrying location')
                                    .attachLocation()
                                    .then(() => {
                                        store.dispatch(
                                            updateActivity(activity, activity),
                                        )
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
