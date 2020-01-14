import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import identityRefreshToken from '../requests/identityRefreshToken'
import { tokensReceived } from '../redux/actions'

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
                    // console.log('tokens received')
                    store.dispatch(tokensReceived(res))
                    resolve(res)
                })
                .catch(err => {
                    // console.log('error refreshing tokens')
                    reject(err)
                })
        })
    }

    isExpired() {
        return this.token_lifetime > timestamp()
    }

    expiresSoon() {
        return this.token_lifetime - 600 > timestamp()
    }
}

export async function example() {
    //
}
