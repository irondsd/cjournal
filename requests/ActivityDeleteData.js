import { APIBaseURL } from '../properties'
import { scheduleSync } from '../services/connectivityWatcher'

export default function activityDeleteData(id, api_key, activityId) {
    const url =
        APIBaseURL + `users/${id}/activity/${activityId}?api_key=${api_key}`
    return fetch(url, { method: 'DELETE' })
}
