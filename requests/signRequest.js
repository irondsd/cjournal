export function signRequest(request, token) {
    if (typeof request !== 'object') throw new Error('request is not an object')
    if (!request.headers) request.headers = {}

    request.headers.append('Authorization', 'Bearer ' + token)

    return request
}
