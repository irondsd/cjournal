import { identityTokenUrl } from '../properties'
import { tokensReceived } from '../redux/actions'

export default function identityRefreshToken(refresh_token) {
    let formData = new FormData()
    formData.append('grant_type', 'refresh_token')
    formData.append('client_id', 'ApiClient')
    formData.append('refresh_token', refresh_token)

    return fetch(identityTokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    }).then(res => {
        if (res.ok) {
            res = res.json()
            return res
        } else {
            console.log('error updating token', res)
            throw new Error('invalid grant')
        }
    })
}
