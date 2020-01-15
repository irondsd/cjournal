import { identityUserInfoUrl } from '../properties'
import { updateUser, logoutUser } from '../redux/actions'
import NavigationService from '../navigation/NavigationService'
export function identityUserInfo(access_token) {
    return dispatch => {
        fetch(identityUserInfoUrl, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => {
                if (res.status === 401) {
                    throw new Error('unauthorized')
                }

                return res.json()
            })
            .then(res => {
                dispatch(updateUser(res))
            })
            .catch(err => {
                console.log(err)
                // dispatch(logoutUser())
                // NavigationService.navigate('Login')
            })
    }
}
