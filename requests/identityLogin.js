import { identityTokenUrl } from '../properties'
import { tokensReceived } from '../redux/actions/'

export function identityLogin(username, password) {
    let formdata = new FormData()
    formdata.append('grant_type', 'password')
    formdata.append('client_id', 'ApiClient')
    formdata.append('username', username)
    formdata.append('password', password)

    return dispatch => {
        fetch(identityTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata,
        })
            .then(res => res.json())
            .then(res => {
                dispatch(tokensReceived(res))
            })
            .catch(err => {
                console.log(err)
                // TODO: errors here
            })
    }
}
