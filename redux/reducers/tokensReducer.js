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
            // state = {
            //     access_token: payload.access_token,
            //     refresh_token: payload.refresh_token,
            //     token_lifetime:
            //         payload.token_lifetime ||
            //         timestamp() + parseInt(payload.expires_in),
            //     isLoggedIn: isLoggedIn,
            // }
            // console.log(state)
            let token_lifetime =
                payload.token_lifetime ||
                timestamp() + parseInt(payload.expires_in)
            state = new Tokens(
                payload.access_token,
                payload.refresh_token,
                token_lifetime,
                isLoggedIn,
            )

            tokensAsyncSave(state)
            return state
        default:
            return state
    }
}
