import { signRequest } from './signRequest'
import { fetchWithTimeout } from './TimeoutReq'
import { apiUrl } from '../constants'

const defaultHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
})

function request(path, token, method, body) {
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
                if (res.ok) return res.json()
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

export function Post(path, token, body) {
    return request(path, token, 'POST', body)
}

export function Put(path, token, body) {
    return request(path, token, 'POST', body)
}

export function Get(path, token, body) {
    return request(path, token, 'GET', body)
}

export function Delete(path, token, body) {
    return request(path, token, 'DELETE', body)
}
