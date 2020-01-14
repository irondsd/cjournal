import { apiUrl, rec_version } from '../properties'

export default function activityPutData(id, access_token, activity) {
    const url = apiUrl + `users/${id}/activity/${activity.id}`
    return fetch(url, {
        method: 'PUT',
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
