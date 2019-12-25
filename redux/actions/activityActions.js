export const addActivity = activity => {
    return {
        type: 'ADD_ACTIVITY',
        payload: activity,
    }
}

export const replaceActivities = activity => {
    return {
        type: 'REPLACE_ACTIVITIES',
        payload: activity,
    }
}

export const updateActivities = activities => {
    return {
        type: 'UPDATE_ACTIVITIES',
        payload: activities,
    }
}

export const updateActivity = (originalActivity, changedActivity) => {
    return {
        type: 'UPDATE_ACTIVITY',
        payload: [originalActivity, changedActivity],
    }
}

export const deleteActivity = activity => {
    return {
        type: 'DELETE_ACTIVITY',
        payload: activity,
    }
}

export const activitySetId = (id, activity) => {
    return {
        type: 'ACTIVITY_SET_ID',
        payload: {
            activity: activity,
            id: id,
        },
    }
}

export const activitySynced = activity => {
    return {
        type: 'ACTIVITY_SYNCED',
        payload: activity,
    }
}

export const activityDeleted = activity => {
    return {
        type: 'ACTIVITY_DELETED',
        payload: activity,
    }
}

export const activitySendFailed = activity => {
    return {
        type: 'ACTIVITY_SEND_FAILED',
        payload: activity,
    }
}

export const activityFetchFailed = () => {
    return {
        type: 'ACTIVITY_FETCH_FAILED',
    }
}

export const logoutUserActivity = () => {
    return {
        type: 'LOGOUT_USER',
    }
}
