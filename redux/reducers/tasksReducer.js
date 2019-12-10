import { tasksAsyncSave } from '../../services/asyncStorage'
import { sortTasks } from '../../helpers/sort'
import Task, { addOrUpdate, exists, sort } from '../../classes/Task'

export default function tasksReducer(state = [], { type, payload }) {
    switch (type) {
        case 'REPLACE_TASKS':
            if (!state) state = []

            state = payload.map(task => {
                task = new Task(
                    task.id,
                    task.activity_type,
                    task.time,
                    task.completed,
                    task.last_updated,
                    task.data,
                )
                addOrUpdate(state, task)
                return task
            })

            state = state.filter(task => {
                return exists(payload, task)
            })

            state = sort(state)

            save(state)
            // console.table(state)
            return state
        case 'TASK_COMPLETE':
            for (task of state) {
                if (task.id === payload) task.complete()
            }
            save(state)
            return state

        case 'ADD_ACTIVITY':
            if (payload.tasks_id && !payload.data.failed) {
                for (task in state) {
                    if (task.id == payload.tasks_id) {
                        task.complete()
                    }
                }
            }
            save(state)
            return state
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

function save(state) {
    tasksAsyncSave(state)
}
