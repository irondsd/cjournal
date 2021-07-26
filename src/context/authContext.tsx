import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { tokensAsyncSave } from '../services/asyncStorage'
import {
    authorize as authAuthorize,
    refresh as authRefresh,
} from 'react-native-app-auth'
import { identityServerConfig } from '../constants/config'
import timestamp from '../helpers/timestamp'

const defaultState: AuthState & Tokens = {
    isLoading: true,
    isLoggedIn: false,
    ongoingUpdate: false,
    access_token: null,
    refresh_token: null,
    token_lifetime: null,
}

type Tokens = {
    access_token: string | null
    refresh_token: string | null
    token_lifetime: number | null
}

export type AuthState = {
    isLoading: boolean
    isLoggedIn: boolean
    ongoingUpdate: boolean
}

type AuthFunctions = {
    login?: (s: Tokens) => void
    restore?: (s: Tokens) => void
    logout?: () => void
    loginError?: () => void
    authorize?: () => void
    refresh?: () => void
}

enum ActionTypes {
    RESTORE,
    REFRESH,
    LOGIN,
    LOGIN_ERROR,
    LOGOUT,
    START_UPDATE,
}

type Action = { type: ActionTypes; payload?: Tokens }

const AuthContext = createContext<AuthState & Tokens & AuthFunctions>(
    defaultState,
)

function authReducer(
    state: AuthState & Tokens,
    { type, payload }: Action,
): AuthState & Tokens {
    switch (type) {
        case ActionTypes.RESTORE: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: true,
            }
        }
        case ActionTypes.LOGIN: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: true,
            }
        }
        case ActionTypes.REFRESH: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: true,
            }
        }
        case ActionTypes.LOGIN_ERROR: {
            return {
                ...defaultState,
                isLoading: false,
                isLoggedIn: false,
                ongoingUpdate: true,
            }
        }
        case ActionTypes.LOGOUT:
            return {
                ...defaultState,
                isLoading: false,
                ongoingUpdate: true,
            }
        case ActionTypes.START_UPDATE: {
            return {
                ...state,
                ongoingUpdate: true,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

const AuthProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, defaultState)

    const login = (tokens: Tokens) => {
        dispatch({ type: ActionTypes.LOGIN, payload: tokens })
    }

    const logout = () => {
        dispatch({ type: ActionTypes.LOGOUT })
    }

    const restore = (tokens: Tokens) => {
        dispatch({ type: ActionTypes.RESTORE, payload: tokens })
    }

    const loginError = () => {
        dispatch({ type: ActionTypes.LOGIN_ERROR })
    }

    const authorize = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            authAuthorize(identityServerConfig)
                .then(identityResponce => {
                    const token_lifetime = timestamp(
                        new Date(identityResponce.accessTokenExpirationDate),
                    )
                    const access_token = identityResponce.accessToken
                    const refresh_token = identityResponce.refreshToken
                    dispatch({
                        type: ActionTypes.LOGIN,
                        payload: {
                            access_token,
                            refresh_token,
                            token_lifetime,
                        },
                    })
                    console.log('successfully logged in')
                    resolve()
                })
                .catch(err => {
                    console.log('login error: ', err)
                    loginError()
                    reject()
                })
        })
    }

    const refresh = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!state.refresh_token) {
                console.log('should not happen')
                return reject()
            }
            dispatch({ type: ActionTypes.START_UPDATE })
            authRefresh(identityServerConfig, {
                refreshToken: state.refresh_token,
            })
                .then(identityResponce => {
                    const token_lifetime = timestamp(
                        new Date(identityResponce.accessTokenExpirationDate),
                    )
                    const access_token = identityResponce.accessToken
                    const refresh_token = identityResponce.refreshToken
                    dispatch({
                        type: ActionTypes.REFRESH,
                        payload: {
                            access_token,
                            refresh_token,
                            token_lifetime,
                        },
                    })
                    console.log('tokens refreshed')
                    resolve()
                })
                .catch(err => {
                    console.error('identity refresh error', err.message)
                    dispatch({ type: ActionTypes.LOGIN_ERROR })
                    reject()
                })
        })
    }

    useEffect(() => {
        if (state.access_token) tokensAsyncSave(state)
    }, [state])

    const value = {
        ...state,
        login,
        logout,
        restore,
        loginError,
        authorize,
        refresh,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
