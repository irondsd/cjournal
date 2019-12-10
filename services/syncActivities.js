import store from '../store'
import activityPostData from './activityPostData'
import activityFileUpload from './activityFileUpload'
import { activitySetId } from '../actions/activityActions'
import { scheduleSync } from './connectivityWatcher'

export default function syncActivities() {
    let id = store.getState().user.id
    let api_key = store.getState().user.api_key
    let activities = store.getState().activity

    return Promise.all([
        ...activities.map(activity => {
            if (!activity.synced()) {
                return new Promise((resolve, reject) => {
                    activity
                        .sync(id, api_key)
                        .then(() => {
                            // sync activity success
                            resolve()
                        })
                        .catch(() => {
                            // sync activity fail
                            reject()
                        })
                })
            }
        })
    ])
    // })
}
