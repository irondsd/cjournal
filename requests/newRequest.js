import { signRequest } from './signRequest'
import { fetchWithTimeout } from './TimeoutReq'
import { apiUrl } from '../constants'

const defaultHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
})

function newRequest(path, token, method, body) {
    const url = apiUrl + path
    let init = {}
    init.method = method
    init.body = JSON.stringify(body)
    init.headers = defaultHeaders
    init = signRequest(init, token)

    const req = new Request(url, init)

    return new Promise((resolve, reject) => {
        fetchWithTimeout(req)
            .then(res => {
                if (res.ok) {
                    if (res.status === 204) return {}
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

export function Get(path, token, body) {
    return newRequest(path, token, 'GET', body)
}

export function Post(path, token, body) {
    return newRequest(path, token, 'POST', body)
}

export function Put(path, token, body) {
    return newRequest(path, token, 'PUT', body)
}

export function Delete(path, token, body) {
    return newRequest(path, token, 'DELETE', body)
}
