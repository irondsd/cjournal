import { ITokens } from '../../classes/Tokens'
import { TOKENS_RECEIVED, TOKENS_LOADED } from '../types'

export const tokensReceived = (tokens: ITokens) => {
    return {
        type: TOKENS_RECEIVED,
        payload: tokens,
    }
}

export const tokensLoaded = (tokens: ITokens) => {
    return {
        type: TOKENS_LOADED,
        payload: tokens,
    }
}
