import { tokensAsyncSave } from '../../services/asyncStorage'
import timestamp from '../../helpers/timestamp'
import Tokens from '../../classes/Tokens'
import { ITokens, ITokensClass } from '../../classes/Tokens'
import { TOKENS_RECEIVED, TOKENS_LOADED } from '../types'

const initialState: ITokens = {
    isLoggedIn: false,
    access_token: '',
    refresh_token: '',
    token_lifetime: 0,
    ongoingUpdate: false,
}

export type IdentityTokensResponce = {
    accessToken: string
    refreshToken: string
    accessTokenExpirationDate: string
}

export type TokensAction = {
    type: typeof TOKENS_RECEIVED | typeof TOKENS_LOADED
    payload: ITokens & IdentityTokensResponce
}

export default function userReducer(
    state: ITokensClass = initialState as ITokensClass,
    { type, payload }: TokensAction,
) {
    switch (type) {
        case TOKENS_RECEIVED:
            let isLoggedIn = payload.accessToken ? true : false
            let token_lifetime = timestamp(
                new Date(payload.accessTokenExpirationDate),
            )
            let token = payload.accessToken
            let refresh = payload.refreshToken

            state = new Tokens(token, refresh, token_lifetime, isLoggedIn)

            tokensAsyncSave(state)
            return state
        case TOKENS_LOADED:
            state = new Tokens(
                payload.access_token,
                payload.refresh_token,
                payload.token_lifetime,
                payload.access_token ? true : false,
            )

            tokensAsyncSave(state)
            return state
        default:
            return state
    }
}
