export const updateUser = user => {
    return {
        type: 'UPDATE_USER',
        payload: user,
    }
}

export const identityUser = user => {
    return {
        type: 'IDENTITY_USER',
        payload: user,
    }
}

export const userFetchFailed = () => {
    return {
        type: 'USER_FETCH_FAILED',
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER',
    }
}
