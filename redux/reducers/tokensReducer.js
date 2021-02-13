import { tokensAsyncSave, removeAll } from '../../services/asyncStorage'
import timestamp from '../../helpers/timestamp'
import Tokens from '../../classes/Tokens'

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
            let token_lifetime = timestamp(
                new Date(payload.accessTokenExpirationDate),
            )
            let token = payload.accessToken
            let refresh = payload.refreshToken

            state = new Tokens(token, refresh, token_lifetime, isLoggedIn)

            tokensAsyncSave(state)
            return state
        default:
            return state
    }
}
