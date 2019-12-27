import { tokensAsyncSave, removeAll } from '../../services/asyncStorage'
import timestamp from '../../helpers/timestamp'

const initialState = {
    isLoggedIn: false,
    access_token: '',
    refresh_token: '',
    token_lifetime: '',
}

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'TOKENS_RECEIVED':
            let isLoggedIn = true
            state = {
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
                token_lifetime: timestamp() + payload.expires_in,
                isLoggedIn: isLoggedIn,
            }
            tokensAsyncSave(state)
            return state
        case 'TOKENS_REFRESH_ERROR':
            removeAll()
            return initialState
        default:
            return state
    }
}
