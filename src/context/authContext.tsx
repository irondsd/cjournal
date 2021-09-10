import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { authAsyncSave } from '../services/asyncStorage'
import {
    authorize as authAuthorize,
    refresh as authRefresh,
} from 'react-native-app-auth'
import { identityServerConfig } from '../constants/config'
import timestamp from '../helpers/timestamp'

const defaultState: AuthState = {
    isLoading: true,
    isLoggedIn: false,
    ongoingUpdate: false,
    access_token: null,
    refresh_token: null,
    token_lifetime: null,
}

export type AuthState = Tokens & State

type Tokens = {
    access_token: string | null
    refresh_token: string | null
    token_lifetime: number | null
}

type State = {
    isLoading: boolean
    isLoggedIn: boolean
    ongoingUpdate: boolean
}

type AuthFunctions = {
    login?: (s: Tokens) => void
    restore?: (s: Tokens) => void
    logout?: () => void
    loginError?: () => void
    authorize?: () => Promise<void>
    refresh?: () => Promise<void>
}

enum Actions {
    RESTORE,
    REFRESH,
    LOGIN,
    LOGIN_ERROR,
    REFRESH_ERROR,
    LOGOUT,
    START_UPDATE,
}

type Action = { type: Actions; payload?: Tokens }

const AuthContext = createContext<AuthState & AuthFunctions>(defaultState)

function authReducer(state: AuthState, { type, payload }: Action): AuthState {
    console.log('Auth call:', Actions[type])
    switch (type) {
        case Actions.RESTORE: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: false,
            }
        }
        case Actions.LOGIN: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: false,
            }
        }
        case Actions.REFRESH: {
            const isLoggedIn = payload?.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
                ongoingUpdate: false,
            }
        }
        case Actions.REFRESH_ERROR: {
            return state
        }
        case Actions.LOGIN_ERROR: {
            return {
                ...defaultState,
                isLoading: false,
                isLoggedIn: false,
                ongoingUpdate: false,
            }
        }
        case Actions.LOGOUT:
            return {
                ...defaultState,
                isLoading: false,
                ongoingUpdate: false,
            }
        case Actions.START_UPDATE: {
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
        dispatch({ type: Actions.LOGIN, payload: tokens })
    }

    const logout = () => {
        dispatch({ type: Actions.LOGOUT })
    }

    const restore = (tokens: Tokens) => {
        dispatch({ type: Actions.RESTORE, payload: tokens })
    }

    const loginError = () => {
        dispatch({ type: Actions.LOGIN_ERROR })
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
                        type: Actions.LOGIN,
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
                    console.log('identity login error: ', err)
                    loginError()
                    reject()
                })
        })
    }

    const refresh = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!state.refresh_token) {
                console.log('should not ever happen')
                return reject()
            }
            dispatch({ type: Actions.START_UPDATE })
            authRefresh(identityServerConfig, {
                refreshToken: state.refresh_token,
            })
                .then(identityResponce => {
                    console.log('got identity response')
                    const token_lifetime = timestamp(
                        new Date(identityResponce.accessTokenExpirationDate),
                    )
                    const access_token = identityResponce.accessToken
                    const refresh_token = identityResponce.refreshToken
                    dispatch({
                        type: Actions.REFRESH,
                        payload: {
                            access_token,
                            refresh_token,
                            token_lifetime,
                        },
                    })
                    console.log('tokens successfully refreshed')
                    resolve()
                })
                .catch(err => {
                    console.log('identity refresh error', err)
                    dispatch({ type: Actions.REFRESH_ERROR })
                    reject()
                })
        })
    }

    useEffect(() => {
        if (state.access_token) authAsyncSave(state)
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
