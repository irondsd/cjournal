import { apiBaseUrl } from '../properties'
import {
    updateActivities,
    activityFetchFailed,
} from '../redux/actions/activityActions'

export const activityFetchData = (id, api_key) => {
    const url = apiBaseUrl + `users/${id}/activity?api_key=${api_key}`
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                dispatch(updateActivities(res))
            })
            .catch(err => {
                dispatch(activityFetchFailed())
            })
    }
}
