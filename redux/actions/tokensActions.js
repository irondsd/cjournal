export const tokensRefresh = tokens => {
    // return {
    //     type: 'TOKENS_REFRESH',
    //     payload: tokens.refresh_token
    // }
    // return dispatch => {
    //     fetch()
    // .then(res => dispatch(tokensReceived(res)))
    // .catch(err => dispatch(tokensRefreshError(error)))
    // }
}

export const tokensReceived = tokens => {
    return {
        type: 'TOKENS_RECEIVED',
        payload: tokens,
    }
}

export const tokensRefreshError = () => {
    return {
        type: 'TOKENS_REFRESH_ERROR',
    }
}
