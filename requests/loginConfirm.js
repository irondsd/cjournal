import { apiUrl } from '../constants'
import timeoutFetch from '../helpers/timeoutFetch'

export function loginConfirm(access_token) {
    return new Promise((resolve, reject) => {
        const url = apiUrl + 'login'
        timeoutFetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(res)
            })
    })
}
