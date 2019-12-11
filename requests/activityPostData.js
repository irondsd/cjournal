import { APIBaseURL, rec_version } from '../properties'
import { scheduleSync } from '../services/connectivityWatcher'

export default function activityPostData(id, api_key, activity) {
    const url = APIBaseURL + `users/${id}/activity?api_key=${api_key}`
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...activity,
        }),
    }).then(res => res.json())
}
