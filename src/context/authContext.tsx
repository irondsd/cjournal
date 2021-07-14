import React, { createContext, useReducer, useContext } from 'react'

const defaultState: State = {
    isLoading: true,
    isLoggedIn: false,
    ongoingUpdate: false,
    access_token: undefined,
    refresh_token: undefined,
    token_lifetime: undefined,
}

type State = {
    isLoading: boolean
    isLoggedIn: boolean
    ongoingUpdate: boolean
    access_token: string
    refresh_token: string
    token_lifetime: number
}

type AuthFunctions = {
    login?: (s: State) => void
    restore?: (s: State) => void
    logout?: () => void
}

const AuthContext = createContext<State & AuthFunctions>(defaultState)

function authReducer(state, action): State {
    switch (action.type) {
        case 'RESTORE': {
            const isLoggedIn = action.tokens.access_token ? true : false
            return {
                ...state,
                isLoggedIn,
                ...action.tokens,
                isLoading: false,
            }
        }
        case 'LOGIN': {
            const isLoggedIn = action.tokens.access_token ? true : false
            return {
                ...state,
                isLoggedIn,
                isSignout: false,
                ...action.tokens,
            }
        }
        case 'LOGOUT':
            return defaultState
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, defaultState)

    const login = (tokens: State) => {
        dispatch({ type: 'LOGIN', tokens })
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const restore = (tokens: State) => {
        dispatch({ type: 'RESTORE', tokens })
    }

    const value = { ...state, login, logout, restore }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
