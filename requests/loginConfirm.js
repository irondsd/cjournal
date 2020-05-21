import { apiUrl } from '../constants'
import timeoutFetch from '../helpers/timeoutFetch'
import { idinvWatcher } from '../services/idinvWatcher'

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
                idinvWatcher(res.id, access_token, res.idinv)
                resolve(res)
            })
            .catch(err => {
                err.error = err.message
                resolve(err)
            })
    })
}
