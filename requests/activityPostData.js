import { apiUrl, rec_version } from '../properties'

export default function activityPostData(id, api_key, activity) {
    const url = apiUrl + `users/${id}/activity?api_key=${api_key}`
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
