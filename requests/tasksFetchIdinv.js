import { apiUrl } from '../constants'
import { replaceTasks, tasksFetchFailed } from '../redux/actions/tasksActions'

export const tasksFetchIdinv = (idinv, access_token) => {
    const url = apiUrl + `idinv/${idinv}/tasks`
    return dispatch => {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
            .then(res => res.json())
            .then(res => {
                dispatch(replaceTasks(res))
            })
            .catch(err => {
                dispatch(tasksFetchFailed())
            })
    }
}
