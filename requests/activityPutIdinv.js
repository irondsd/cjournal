import { apiUrl } from '../constants'
import {
    updateActivities,
    activityFetchFailed,
} from '../redux/actions/activityActions'
import timeoutFetch from '../helpers/timeoutFetch'

export default async function activityPutData(idinv, access_token, activity) {
    const url = apiUrl + `idinv/${idinv}/activity/${activity.id}`
    return timeoutFetch(url, {
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
