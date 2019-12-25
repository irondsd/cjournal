import { apiBaseUrl } from '../properties'
import { replaceTasks, tasksFetchFailed } from '../redux/actions/tasksActions'

export const tasksFetchData = (id, api_key) => {
    const url = apiBaseUrl + `users/${id}/tasks?api_key=${api_key}`
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                dispatch(replaceTasks(res))
            })
            .catch(err => {
                dispatch(tasksFetchFailed())
            })
    }
}
