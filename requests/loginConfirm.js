import { apiUrl } from '../constants'
import { updateUser } from '../redux/actions/userActions'
import { Alert } from 'react-native'
import { strings } from '../localizations'

export function loginConfirm(access_token) {
    return new Promise((resolve, reject) => {
        const url = apiUrl + 'login'
        fetch(url, {
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
