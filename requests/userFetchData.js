import { apiUrl, paths } from '../constants'
import {
    updateUser,
    userFetchFailed,
    logoutUser,
} from '../redux/actions/userActions'
import { Alert } from 'react-native'
import NavigationService from '../navigation/NavigationService'

export const userFetchData = (id, access_token) => {
    return dispatch => {
        const url = apiUrl + `users/${id}`

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res)
                    throw new Error(res)
                } else {
                    dispatch(updateUser(res))
                }
            })
            .catch(err => {
                dispatch(userFetchFailed())
            })
    }
}
