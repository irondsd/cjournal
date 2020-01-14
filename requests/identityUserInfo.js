import { identityUserInfoUrl } from '../properties'
import { updateUser } from '../redux/actions'

export function identityUserInfo(access_token) {
    return dispatch => {
        fetch(identityUserInfoUrl, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => res.json())
            .then(res => {
                dispatch(updateUser(res))
            })
            .catch(err => {
                console.log(err)
                // TODO: errors here
            })
    }
}
