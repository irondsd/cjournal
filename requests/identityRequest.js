import {
    identityRegistrationUrl,
    identityTokenUrl,
    identityUserInfoUrl,
} from '../constants'
import { signRequest } from './signRequest'
import { fetchWithTimeout } from './TimeoutReq'

function newRequest(url, token, body) {
    let init = {}
    init.method = 'POST'
    init.headers = new Headers({ 'Content-Type': 'multipart/form-data' })
    init.body = new FormData()

    for (const key in body) init.body.append(key, body[key])

    let req = new Request(url, init)
    req = signRequest(req, token)

    return new Promise((resolve, reject) => {
        fetchWithTimeout(req)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                reject(JSON.stringify(res))
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function UserInfo(token) {
    return newRequest(identityUserInfoUrl, token)
}

export function Registration(token, email, password) {
    // TODO: check
    return newRequest(identityRegistrationUrl, token, body)
}

export function identityLogin(token, email, password) {
    // TODO: check
    return newRequest(identityTokenUrl, token, body)
}

export function RefreshToken(token, refresh_token) {
    const body = {
        grant_type: 'refresh_token',
        client_id: 'ApiClient',
        refresh_token: refresh_token,
    }

    return newRequest(identityTokenUrl, token, body)
}
