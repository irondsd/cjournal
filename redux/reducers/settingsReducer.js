import { settingsAsyncSave } from '../../services/asyncStorage'
import PushNotification from 'react-native-push-notification'

const initialState = {
    notifications: true,
    idinvFilter: false,
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_NOTIFICATIONS':
            state = {
                ...state,
                notifications: payload,
            }

            if (!state.notifications) {
                PushNotification.cancelAllLocalNotifications()
            }

            settingsAsyncSave(state)
            return state
        case 'SET_IDINV_FILTER':
            state = {
                ...state,
                idinvFilter: payload,
            }

            settingsAsyncSave(state)
            return state
        case 'LOAD_SETTINGS':
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
