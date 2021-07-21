import React, { createContext, useReducer, useContext } from 'react'

const defaultState: State = {
    _id: undefined,
    sub: undefined,
    username: undefined,
    idinv: undefined,
    patient: {
        hide_elements: [],
        course_therapy: [],
        relief_of_attack: [],
        tests: [],
    },
}

type State = {
    _id: string
    sub: string
    username: string
    idinv: string
    patient: {
        hide_elements: string[]
        course_therapy: string[]
        relief_of_attack: string[]
        tests: string[]
    }
}

type UserFunctions = {
    load?: (s: State) => void
    reset?: () => void
}

const UserContext = createContext<State & UserFunctions>(defaultState)

function userReducer(state, action): State {
    switch (action.type) {
        case 'LOAD': {
            return {
                ...state,
                ...action.user,
            }
        }
        case 'RESET': {
            return defaultState
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, defaultState)

    const load = (user: State) => {
        dispatch({ type: 'LOAD', user })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    const value = { ...state, load, reset }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
    const context = useContext(UserContext)

    return context
}

export { UserProvider, useUser }
