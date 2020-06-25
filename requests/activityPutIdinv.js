import { apiUrl } from '../constants'
import {
    updateActivities,
    activityFetchFailed,
} from '../redux/actions/activityActions'

export const activityPutIdinv = (idinv, access_token, activity) => {
    const url = apiUrl + `idinv/${idinv}/activity//${activity.id}`
    return dispatch => {
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
            body: JSON.stringify({
                ...activity,
                idinv: idinv,
            }),
        })
    }
}
