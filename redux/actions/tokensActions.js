export const tokensReceived = tokens => {
    return {
        type: 'TOKENS_RECEIVED',
        payload: tokens,
    }
}
