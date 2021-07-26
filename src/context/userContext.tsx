import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { userAsyncSave } from '../services/asyncStorage'

const defaultState: User = {
    _id: null,
    sub: null,
    username: null,
    idinv: null,
    patient: {
        hide_elements: [],
        course_therapy: [],
        relief_of_attack: [],
        tests: [],
    },
    identity: null,
}

export type User = {
    _id: string | null
    sub: string | null
    username: string | null
    idinv: string | null
    patient: Patient | null
    identity: Identity | null
}

type Patient = {
    hide_elements: string[]
    course_therapy: string[]
    relief_of_attack: string[]
    tests: string[]
}

type Identity = {
    id: string
    sub: string
    department: string
    display_name: string
    role: string
    preferred_username: string
    name: string
    email: string
    email_verified: boolean
}

type UserFunctions = {
    load?: (s: User) => void
    reset?: () => void
}

const UserContext = createContext<User & UserFunctions>(defaultState)

function userReducer(state: any, action: any): User {
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

const UserProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, defaultState)

    const load = (user: User) => {
        dispatch({ type: 'LOAD', user })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    useEffect(() => {
        if (state._id) userAsyncSave(state)
    }, [state])

    const value = { ...state, load, reset }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
    const context = useContext(UserContext)

    return context
}

export { UserProvider, useUser }
