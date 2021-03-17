export function signRequest(request: Request, token: string): Request {
    if (typeof request !== 'object') throw new Error('wrong request')

    request.headers.append('Authorization', 'Bearer ' + token)

    return request
}
