import { apiUrl } from '../properties'
import {
    updateActivities,
    activityFetchFailed,
} from '../redux/actions/activityActions'

export const activityFetchData = (id, access_token) => {
    const url = apiUrl + `users/${id}/activity`
    return dispatch => {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => res.json())
            .then(res => {
                dispatch(updateActivities(res))
            })
            .catch(err => {
                dispatch(activityFetchFailed())
            })
    }
}
