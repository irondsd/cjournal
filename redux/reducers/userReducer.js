import { userAsyncSave } from '../../services/asyncStorage'
import { clearFiles } from '../../services/fs'
import { scheduleSync } from '../../services/connectivityWatcher'
import { removeAll } from '../../services/asyncStorage'

const initialState = {
    username: '',
    name: '',
    hide_elements: [],
    course_therapy: [],
    relief_of_attack: [],
    tests: [],
    sub: '',
    email: '',
    preferred_username: '',
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'UPDATE_USER':
            userAsyncSave(payload)

            return {
                ...state,
                ...payload,
            }
        case 'USER_FETCH_FAILED':
            scheduleSync()
            return state
        case 'TOKENS_RECEIVED':
            return state
        case 'LOGOUT_USER':
            removeAll()
            clearFiles()
            return initialState
        default:
            return state
    }
}
