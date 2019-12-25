import { apiBaseUrl, rec_version } from '../properties'
import { scheduleSync } from '../services/connectivityWatcher'

export default function activityPutData(id, api_key, activity) {
    const url =
        apiBaseUrl + `users/${id}/activity/${activity.id}?api_key=${api_key}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...activity,
        }),
    })
}
