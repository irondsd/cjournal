import { apiUrl } from '../constants'
import { idinvWatcher } from '../services/idinvWatcher'
import { Post } from './newRequest'

export function loginConfirm(access_token: string) {
    return new Promise((resolve, reject) => {
        const url = apiUrl + 'login'
        Post(url, access_token)
            .then(res => res.json())
            .then(res => {
                idinvWatcher(res._id, access_token, res.idinv)
                resolve(res)
            })
            .catch(err => {
                err.error = err.message
                reject(err)
            })
    })
}
