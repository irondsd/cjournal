export const cancelNotification = id => {
    return {
        type: 'CANCEL_NOTIFICATION',
        payload: id
    }
}

export const loadNotifications = array => {
    return {
        type: 'LOAD_NOTIFICATIONS',
        payload: array
    }
}
