import { apiUrl } from '../properties'
import {
    updateUser,
    userFetchFailed,
    logoutUser,
} from '../redux/actions/userActions'
import { Alert } from 'react-native'

export const userFetchData = (id, api_key) => {
    return dispatch => {
        const url = apiUrl + `users/${id}?api_key=${api_key}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    // console.log(res.error)
                    // TODO: if error 404, logout
                    // dispatch(logoutUser())
                } else {
                    dispatch(updateUser(res))
                }
            })
            .catch(err => {
                dispatch(userFetchFailed())
            })
    }
}
