import { authorize, refresh } from 'react-native-app-auth'
import { identityServerConfig } from '../constants/identityServerConfig'
import { loginConfirm } from '../requests/loginConfirm'
import store from '../redux/store'
import { tokensReceived, updateUser } from '../redux/actions/'

export async function authorization() {
    return new Promise((resolve, reject) => {
        try {
            authorize(identityServerConfig).then(result => {
                console.log('working 2')
                if (result.accessToken) {
                    loginConfirm(result.accessToken).then(res => {
                        store.dispatch(updateUser(res))
                    })
                    store.dispatch(tokensReceived(result))

                    resolve('good')
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
