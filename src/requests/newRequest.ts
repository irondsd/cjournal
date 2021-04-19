import { signRequest } from './signRequest'
import { TimeoutRequest } from './TimeoutRequestuest'
import { apiUrl } from '../constants'

const defaultHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
})

function newRequest(
    path: string,
    token: string,
    method: string,
    body?: any,
): Promise<Request> {
    const url = apiUrl + path
    let init: RequestInit = {}
    init.method = method
    init.body = JSON.stringify(body)
    init.headers = defaultHeaders

    let req = new Request(url, init)
    req = signRequest(req, token)

    return new Promise((resolve, reject) => {
        TimeoutRequest(req)
            .then(res => {
                if (res.ok) {
                    const contentType = res.headers.get('content-type')
                    if (
                        contentType &&
                        contentType.indexOf('application/json') !== -1
                    )
                        return res.json()
                    else return {}
                }
                reject(JSON.stringify(res))
            })
            .then((res: any) => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function Get(path: string, token: string, body?: any): Promise<any> {
    return newRequest(path, token, 'GET', body)
}

export function Post(path: string, token: string, body?: any): Promise<any> {
    return newRequest(path, token, 'POST', body)
}

export function Put(path: string, token: string, body?: any): Promise<any> {
    return newRequest(path, token, 'PUT', body)
}

export function Delete(path: string, token: string, body?: any): Promise<any> {
    return newRequest(path, token, 'DELETE', body)
}
