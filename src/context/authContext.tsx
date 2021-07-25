import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { tokensAsyncSave } from '../services/asyncStorage'
import { authorize as makeAuth, refresh } from 'react-native-app-auth'
import { identityServerConfig } from '../constants/config'
import { updateTokenBeforeExpiration } from '../constants'
import { Post } from '../requests/newRequest'
import { Alert } from 'react-native'
import { strings } from '../localization'
import timestamp from '../helpers/timestamp'

const defaultState: AuthState = {
    isLoading: true,
    isLoggedIn: false,
    ongoingUpdate: false,
    access_token: undefined,
    refresh_token: undefined,
    token_lifetime: undefined,
}

export type AuthState = {
    isLoading: boolean
    isLoggedIn: boolean
    ongoingUpdate: boolean
    access_token?: string
    refresh_token?: string
    token_lifetime?: number
}

type AuthFunctions = {
    login?: (s: AuthState) => void
    restore?: (s: AuthState) => void
    logout?: () => void
    loginError?: () => void
    authorize?: () => void
}

type IdentityResponce = {
    accessToken: string
    refreshToken: string
    accessTokenExpirationDate: string
}

const AuthContext = createContext<AuthState & AuthFunctions>(defaultState)

function authReducer(state: AuthState, { type, payload }: any): AuthState {
    switch (type) {
        case 'RESTORE': {
            const isLoggedIn = payload.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
            }
        }
        case 'LOGIN': {
            const isLoggedIn = payload.access_token ? true : false
            return {
                ...state,
                ...payload,
                isLoggedIn,
                isLoading: false,
            }
        }
        case 'LOGIN_ERROR': {
            return {
                ...defaultState,
                isLoading: false,
                isLoggedIn: false,
            }
        }
        case 'LOGOUT':
            return defaultState
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

const AuthProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, defaultState)

    const login = (tokens: AuthState) => {
        dispatch({ type: 'LOGIN', tokens })
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const restore = (tokens: AuthState) => {
        dispatch({ type: 'RESTORE', tokens })
    }

    const loginError = () => {
        dispatch({ type: 'LOGIN_ERROR' })
    }

    const authorize = () => {
        makeAuth(identityServerConfig)
            .then((identityResponce: IdentityResponce) => {
                if (identityResponce.accessToken) {
                    const token_lifetime = timestamp(
                        new Date(identityResponce.accessTokenExpirationDate),
                    )
                    const access_token = identityResponce.accessToken
                    const refresh_token = identityResponce.refreshToken
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            access_token,
                            refresh_token,
                            token_lifetime,
                        },
                    })
                }
            })
            .catch(err => {
                console.log('login error: ', err)
                loginError()
            })
    }

    useEffect(() => {
        if (state.access_token) tokensAsyncSave(state)
    }, [state])

    const value = { ...state, login, logout, restore, loginError, authorize }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
