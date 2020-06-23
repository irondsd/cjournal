import { apiUrl } from '../constants'
import {
    updateActivities,
    activityFetchFailed,
} from '../redux/actions/activityActions'

export const activityFetchIdinv = (idinv, access_token) => {
    const url = apiUrl + `idinv/${idinv}/activity/`
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
