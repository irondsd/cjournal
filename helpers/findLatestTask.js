import store from '../redux/store'
import timestamp from './timestamp'

export default function findLasestTask(activity_type) {
    let id = null
    let tasks = store.getState().tasks

    for (task of tasks) {
        if (task.activity_type === activity_type) {
            console.log(timestamp(), task.time)
            if (timestamp() + 3600 > task.time) {
                id = task.id
                break
            }
        }
    }

    return id
}
