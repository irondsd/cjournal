import { identityTokenUrl } from '../constants'
import { tokensReceived, updateUser } from '../redux/actions/'
import { loginConfirm } from './loginConfirm'
import { Alert } from 'react-native'
import { strings } from '../localizations'

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
                if (err.message.includes('Network request failed'))
                    Alert.alert(strings.NoConn, strings.CantConnect)
                else Alert.alert(strings.Error, strings.WrongPassword)
            })
    }
}
