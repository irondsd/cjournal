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
        if (res.status === 200) {
            return res.json()
        } else {
            throw new Error('invalid grant')
        }
    })
}
