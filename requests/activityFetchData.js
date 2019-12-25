import { apiBaseUrl } from '../properties'
import { updateActivities } from '../redux/actions/activityActions'
import { scheduleSync } from '../services/connectivityWatcher'

export const activityFetchData = (id, api_key) => {
    const url = apiBaseUrl + `users/${id}/activity?api_key=${api_key}`
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
