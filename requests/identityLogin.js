import { identityTokenUrl } from '../properties'
import { tokensReceived, updateUser } from '../redux/actions/'
import { loginConfirm } from './loginConfirm'

export function identityLogin(username, password) {
    let formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('client_id', 'ApiClient')
    formData.append('username', username)
    formData.append('password', password)

    return dispatch => {
        fetch(identityTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw new Error(res.error)

                if (res.access_token) {
                    loginConfirm(res.access_token).then(res => {
                        dispatch(updateUser(res))
                    })
                    dispatch(tokensReceived(res))
                }
            })
            .catch(err => {
                console.log(err)
                // TODO: errors here
            })
    }
}
