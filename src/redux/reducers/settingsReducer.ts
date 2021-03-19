import { settingsAsyncSave } from '../../services/asyncStorage'
import PushNotification from 'react-native-push-notification'
import { delayNotificationBy } from '../../constants'
import {
    SET_NOTIFICATIONS,
    SET_IDINV_FILTER,
    SET_NOTIFICATION_DELAY,
    LOAD_SETTINGS,
} from '../types'

export interface ISettings {
    notifications: boolean
    idinvFilter: boolean
    notificationDelay: number
}

const initialState: ISettings = {
    notifications: true,
    idinvFilter: false,
    notificationDelay: delayNotificationBy,
}

export type SettingsAction = {
    type: string
    payload: boolean & number
}

export default function userReducer(
    state = initialState,
    { type, payload }: SettingsAction,
) {
    switch (type) {
        case SET_NOTIFICATIONS:
            state = {
                ...state,
                notifications: payload,
            }

            if (!state.notifications) {
                PushNotification.cancelAllLocalNotifications()
            }

            settingsAsyncSave(state)
            return state
        case SET_IDINV_FILTER:
            state = {
                ...state,
                idinvFilter: payload,
            }

            settingsAsyncSave(state)
            return state
        case SET_NOTIFICATION_DELAY:
            state = {
                ...state,
                notificationDelay: payload,
            }
            settingsAsyncSave(state)
            return state
        case LOAD_SETTINGS:
            state = payload

            if (!state.notifications) {
                PushNotification.cancelAllLocalNotifications()
            }

            settingsAsyncSave(state)
            return state
        default:
            return state
    }
}
