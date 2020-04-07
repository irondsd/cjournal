import { userAsyncSave } from '../../services/asyncStorage'
import { clearFiles } from '../../services/fs'
import { scheduleSync } from '../../services/connectivityWatcher'
import { removeAll } from '../../services/asyncStorage'
import { resetHits } from '../../services/hints'

const initialState = {
    username: '',
    hide_elements: [],
    course_therapy: [],
    relief_of_attack: [],
    tests: [],
    role: [],
    department: '',
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'UPDATE_USER':
            state = {
                ...state,
                ...payload,
            }
            userAsyncSave(state)
            return state
        case 'IDENTITY_USER':
            state = {
                ...state,
                username: payload.name,
                role: payload.role,
                department: payload.department,
            }
            return state
        case 'USER_FETCH_FAILED':
            scheduleSync()
            return state
        case 'TOKENS_RECEIVED':
            return state
        case 'LOGOUT_USER':
            removeAll()
            clearFiles()
            resetHits()
            return initialState
        default:
            return state
    }
}
