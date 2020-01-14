import { apiUrl } from '../properties'

export default function activityDeleteData(id, access_token, activityId) {
    const url = apiUrl + `users/${id}/activity/${activityId}`
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + access_token,
        },
    })
}
