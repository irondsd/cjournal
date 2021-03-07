import { apiUrl } from '../constants'
import timeoutFetch from '../helpers/timeoutFetch'

export default function userUpdateIdinv(_id, access_token, idinv) {
    const url = apiUrl + `users/${_id}/`
    return timeoutFetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
        body: JSON.stringify({
            idinv: idinv,
        }),
    })
}
