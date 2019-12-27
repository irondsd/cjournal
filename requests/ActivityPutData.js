import { apiUrl, rec_version } from '../properties'

export default function activityPutData(id, api_key, activity) {
    const url =
        apiUrl + `users/${id}/activity/${activity.id}?api_key=${api_key}`
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
