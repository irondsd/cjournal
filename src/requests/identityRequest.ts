import {
    identityRegistrationUrl,
    identityTokenUrl,
    identityUserInfoUrl,
} from '../constants'
import { signRequest } from './signRequest'
import { TimeoutRequest } from './TimeoutRequest'

function newRequest(url: string, token: string, body?: any) {
    let init: RequestInit = {}
    init.method = 'POST'
    init.headers = new Headers({ 'Content-Type': 'multipart/form-data' })
    init.body = new FormData()

    for (const key in body) init.body.append(key, body[key])

    let req = new Request(url, init)
    req = signRequest(req, token)

    return new Promise((resolve, reject) => {
        TimeoutRequest(req)
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

export function UserInfo(token: string) {
    return newRequest(identityUserInfoUrl, token)
}

export function Registration(email: string, password: string) {
    let formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return fetch(identityRegistrationUrl, {
        method: 'POST',
        body: formData,
    })
}

export function identityLogin(token: string, email: string, password: string) {
    // TODO: check
    // return newRequest(identityTokenUrl, token, body)
}

export function RefreshToken(token: string, refresh_token: string) {
    const body = {
        grant_type: 'refresh_token',
        client_id: 'ApiClient',
        refresh_token: refresh_token,
    }

    return newRequest(identityTokenUrl, token, body)
}
