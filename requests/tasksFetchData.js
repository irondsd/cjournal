import { apiUrl } from '../properties'
import { replaceTasks, tasksFetchFailed } from '../redux/actions/tasksActions'

export const tasksFetchData = (id, access_token) => {
    const url = apiUrl + `users/${id}/tasks`
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
