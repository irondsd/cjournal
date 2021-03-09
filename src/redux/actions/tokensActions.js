export const tokensReceived = tokens => {
    return {
        type: 'TOKENS_RECEIVED',
        payload: tokens,
    }
}

export const tokensLoaded = tokens => {
    return {
        type: 'TOKENS_LOADED',
        payload: tokens,
    }
}
