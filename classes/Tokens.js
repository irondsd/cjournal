import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import identityRefreshToken from '../requests/identityRefreshToken'
import { tokensReceived } from '../redux/actions'
import { updateTokenBeforeExpiration } from '../constants'

export default class Tokens {
    constructor(access_token, refresh_token, token_lifetime, isLoggedIn) {
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.token_lifetime = token_lifetime
        this.isLoggedIn = isLoggedIn
    }

    refresh() {
        return new Promise((resolve, reject) => {
            identityRefreshToken(this.refresh_token)
                .then(res => {
                    if (!res.ok) throw new Error(res.status)
                    if (res.access_token && res.refresh_token) {
                        store.dispatch(tokensReceived(res))
                        resolve(res)
                    } else {
                        throw new Error('No tokens received')
                    }
                })
                .catch(err => {
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
