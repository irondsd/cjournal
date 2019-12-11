import { APIBaseURL } from '../properties'
import { replaceTasks } from '../actions/tasksActions'
import { scheduleSync } from '../services/connectivityWatcher'

export const tasksFetchData = (id, api_key) => {
    const url = APIBaseURL + `users/${id}/tasks?api_key=${api_key}`
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                dispatch(replaceTasks(res))
            })
            .catch(err => {
                scheduleSync()
            })
    }
}
