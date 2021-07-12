import { ISettings } from '../reducers/settingsReducer'
import {
    SET_NOTIFICATIONS,
    SET_IDINV_FILTER,
    SET_NOTIFICATION_DELAY,
    LOAD_SETTINGS,
} from '../types'

export const setNotifications = (value: boolean) => {
    return {
        type: SET_NOTIFICATIONS,
        payload: value,
    }
}

export const setIdinvFilter = (value: boolean) => {
    return {
        type: SET_IDINV_FILTER,
        payload: value,
    }
}

export const setNotificationDelay = (value: number) => {
    return {
        type: SET_NOTIFICATION_DELAY,
        payload: value,
    }
}

export const loadSettings = (settings: ISettings) => {
    return {
        type: LOAD_SETTINGS,
        payload: settings,
    }
}
