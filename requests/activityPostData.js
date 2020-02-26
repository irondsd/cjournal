import { apiUrl } from '../constants'

export default function activityPostData(id, access_token, activity) {
    const url = apiUrl + `users/${id}/activity`
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            ...activity,
        }),
    }).then(res => res.json())
}
