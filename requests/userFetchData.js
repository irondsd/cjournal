import { APIBaseURL } from '../properties'
import { updateUser } from '../actions/userActions'
import { Alert } from 'react-native'
import { scheduleSync } from '../services/connectivityWatcher'

export const userFetchData = (id, api_key) => {
    return dispatch => {
        const url = APIBaseURL + `users/${id}?api_key=${api_key}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log('err')
                } else {
                    dispatch(updateUser(res))
                }
            })
            .catch(err => {
                scheduleSync()
            })
    }
}
