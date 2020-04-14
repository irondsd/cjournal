import { authorize, refresh } from 'react-native-app-auth'
import { identityServerConfig } from '../constants/identityServerConfig'
import { loginConfirm } from '../requests/loginConfirm'
import store from '../redux/store'
import { tokensReceived, updateUser } from '../redux/actions/'
import timestamp from '../helpers/timestamp'
import { Alert } from 'react-native'
import { strings } from '../localizations'

// TODO: merge with tokens class

export async function authorization() {
    return new Promise((resolve, reject) => {
        authorize(identityServerConfig)
            .then(result => {
                if (result.accessToken) {
                    result = tokensConverter(result)
                    loginConfirm(result.access_token)
                        .then(res => {
                            if (res.error) {
                                Alert.alert(
                                    strings.Error,
                                    strings.CantConnectBackend,
                                )
                                throw new Error(res)
                            }
                            store.dispatch(updateUser(res))
                            store.dispatch(tokensReceived(result))

                            resolve(result)
                        })
                        .catch(err => {
                            reject(err)
                        })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

export async function refreshTokens(refreshToken) {
    return new Promise((resolve, reject) => {
        refresh(identityServerConfig, {
            refreshToken: refreshToken,
        })
            .then(result => {
                if (result.accessToken) {
                    result = tokensConverter(result)

                    store.dispatch(tokensReceived(result))
                    resolve(result)
                }
            })
            .catch(err => {
                console.log('error', err.message)
                reject(err)
            })
    })
}

function tokensConverter(tokens) {
    return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        token_lifetime: timestamp(new Date(tokens.accessTokenExpirationDate)),
    }
}
