import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import identityRefreshToken from '../requests/identityRefreshToken'
import { tokensReceived, updateUser } from '../redux/actions'
import { updateTokenBeforeExpiration } from '../constants'
import { authorize, refresh } from 'react-native-app-auth'
import { identityServerConfig } from '../constants/config'
import { loginConfirm } from '../requests/loginConfirm'
import { Alert } from 'react-native'
import { strings } from '../localization'

export default class Tokens {
    constructor(access_token, refresh_token, token_lifetime, isLoggedIn) {
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.token_lifetime = token_lifetime
        this.isLoggedIn = isLoggedIn
        this.ongoingUpdate = false
    }

    static async receive() {
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

    async update() {
        return new Promise((resolve, reject) => {
            if (this.ongoingUpdate) return reject('already updating')
            this.ongoingUpdate = true

            refresh(identityServerConfig, {
                refreshToken: this.refresh_token,
            })
                .then(result => {
                    this.ongoingUpdate = false
                    if (result.accessToken) {
                        result = tokensConverter(result)

                        store.dispatch(tokensReceived(result))
                        resolve(result)
                    }
                })
                .catch(err => {
                    this.ongoingUpdate = false
                    console.log('error', err.message)
                    reject(err)
                })
        })
    }

    isExpired() {
        return this.token_lifetime < timestamp()
    }

    expiresSoon() {
        // 10 minutes before it expires
        return this.token_lifetime - timestamp() < updateTokenBeforeExpiration
    }
}

function tokensConverter(tokens) {
    return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        token_lifetime: timestamp(new Date(tokens.accessTokenExpirationDate)),
    }
}
