export const cancelNotification = _id => {
    return {
        type: 'CANCEL_NOTIFICATION',
        payload: _id,
    }
}

export const loadNotifications = array => {
    return {
        type: 'LOAD_NOTIFICATIONS',
        payload: array,
    }
}
