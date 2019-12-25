import { apiBaseUrl } from '../properties'

export default function activityDeleteData(id, api_key, activityId) {
    const url =
        apiBaseUrl + `users/${id}/activity/${activityId}?api_key=${api_key}`
    return fetch(url, { method: 'DELETE' })
}
