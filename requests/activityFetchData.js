import { APIBaseURL } from '../properties'
import { updateActivities } from '../actions/activityActions'
import { scheduleSync } from '../services/connectivityWatcher'

export const activityFetchData = (id, api_key) => {
    const url = APIBaseURL + `users/${id}/activity?api_key=${api_key}`
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                dispatch(updateActivities(res))
            })
            .catch(err => {
                scheduleSync()
            })
    }
}
