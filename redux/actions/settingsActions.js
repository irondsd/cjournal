export const setNotifications = value => {
    return {
        type: 'SET_NOTIFICATIONS',
        payload: value,
    }
}

export const setIdinvFilter = value => {
    return {
        type: 'SET_IDINV_FILTER',
        payload: value,
    }
}

export const loadSettings = settings => {
    return {
        type: 'LOAD_SETTINGS',
        payload: settings,
    }
}
