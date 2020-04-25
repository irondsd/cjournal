import { apiUrl } from '../constants'
import timeoutFetch from '../helpers/timeoutFetch'

export default function activityPostData(id, access_token, activity) {
    const url = apiUrl + `users/${id}/activity`
    return timeoutFetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            ...activity,
        }),
    })
}
