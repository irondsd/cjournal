import { apiUrl } from '../properties'

export default function userUpdateIdinv(id, access_token, idinv) {
    const url = apiUrl + `users/${id}/`
    console.log(url, access_token, idinv)
    return fetch(url, {
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
