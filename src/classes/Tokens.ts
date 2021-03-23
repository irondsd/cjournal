import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import { tokensReceived, updateUser } from '../redux/actions'
import { updateTokenBeforeExpiration } from '../constants'
import { authorize, refresh } from 'react-native-app-auth'
import { identityServerConfig } from '../constants/config'
import { Post } from '../requests/newRequest'
import { Alert } from 'react-native'
import { strings } from '../localization'

export interface ITokens {
    access_token: string
    refresh_token: string
    token_lifetime: number
    isLoggedIn: boolean
    ongoingUpdate: boolean
}

export interface ITokensClass extends ITokens {
    // receive: () => Promise<ITokens>
    update: () => Promise<ITokens>
    expiresSoon: () => boolean
    isExpired: () => boolean
}

export default class Tokens implements ITokensClass {
    access_token: string
    refresh_token: string
    token_lifetime: number
    isLoggedIn: boolean
    ongoingUpdate: boolean

    constructor(
        access_token: string,
        refresh_token: string,
        token_lifetime: number,
        isLoggedIn: boolean,
    ) {
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.token_lifetime = token_lifetime
        this.isLoggedIn = isLoggedIn
        this.ongoingUpdate = false
    }

    static async receive(): Promise<ITokens> {
        return new Promise((resolve, reject) => {
            authorize(identityServerConfig)
                .then((result: any) => {
                    if (result.accessToken) {
                        Post('login', result.accessToken)
                            .then((res: any) => {
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

    async update(): Promise<ITokens> {
        return new Promise((resolve, reject) => {
            if (this.ongoingUpdate) return reject('already updating')
            this.ongoingUpdate = true

            refresh(identityServerConfig, {
                refreshToken: this.refresh_token,
            })
                .then((result: any) => {
                    this.ongoingUpdate = false
                    if (result.accessToken) {
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
        return this.token_lifetime - timestamp() < updateTokenBeforeExpiration
    }
}
