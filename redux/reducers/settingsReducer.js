import { settingsAsyncSave } from '../../services/asyncStorage'

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
            settingsAsyncSave(state)
            return state
        default:
            settingsAsyncSave(state)
            return state
    }
}
