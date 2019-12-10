import { userAsyncSave } from '../../services/asyncStorage'
import { clearFiles } from '../../services/fs'

const initialState = {
    isLoggedIn: false,
    id: 0,
    name: '',
    birthday: 0,
    gender: '',
    email: '',
    api_key: '',
    hide_elements: [],
    course_therapy: [],
    relief_of_attack: [],
    tests: [],
}

// TODO: separate prescriptions

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'UPDATE_USER':
            userAsyncSave(payload)
            let isLoggedIn = false
            if (state.api_key || payload.api_key) {
                isLoggedIn = true
            }

            return {
                ...state,
                ...payload,
                isLoggedIn: isLoggedIn,
            }
        case 'LOGOUT_USER':
            clearFiles()
            return initialState
        default:
            return state
    }
}
