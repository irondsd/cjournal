export const replaceTasks = tasks => {
    return {
        type: 'REPLACE_TASKS',
        payload: tasks
    }
}

export const taskComplete = id => {
    return {
        type: 'TASK_COMPLETE',
        payload: id
    }
}

export const logoutUserTasks = () => {
    return {
        type: 'LOGOUT_USER'
    }
}
