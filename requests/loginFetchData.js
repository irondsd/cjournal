import { apiUrl } from '../properties'
import { updateUser } from '../redux/actions/userActions'
import { Alert } from 'react-native'
import { strings } from '../localizations'

export function loginFetchData(username, password) {
    return dispatch => {
        const url = apiUrl + 'login'
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(res => res.json())
            .catch(err => {
                console.log(err)
                Alert.alert(strings.Error, strings.NoConn)
            })
            .then(res => {
                if (!res.api_key) {
                    Alert.alert(strings.Error, strings.CantConnect)
                } else {
                    dispatch(updateUser(res))
                }
            })
            .catch(err => {
                console.log('error in reducer', err)
            })
    }
}
