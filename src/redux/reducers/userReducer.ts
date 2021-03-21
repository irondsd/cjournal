import { userAsyncSave } from '../../services/asyncStorage'
import { clearFiles } from '../../services/fs'
import { scheduleSync } from '../../services/connectivityWatcher'
import { removeAll } from '../../services/asyncStorage'
import { resetHints } from '../../services/hints'
import {
    UPDATE_USER,
    USER_FETCH_FAILED,
    LOGOUT_USER,
    TOKENS_RECEIVED,
} from '../types'

const initialState: IUser = {
    _id: '',
    sub: '',
    username: '',
    patient: {
        hide_elements: [],
        course_therapy: [],
        relief_of_attack: [],
        tests: [],
    },
}

export interface IUser {
    _id: string
    sub: string
    patient?: IPatient
    idinv?: string
    username: string
    identity?: IIdentity
}

export interface IIdentity {
    sub: string
    patient_id: string
    role: string[]
    department: any
}

export interface IPatient {
    hide_elements: string[]
    course_therapy: string[]
    relief_of_attack: string[]
    tests: string[]
}

export type UserAction = {
    type:
        | typeof UPDATE_USER
        | typeof USER_FETCH_FAILED
        | typeof LOGOUT_USER
        | typeof TOKENS_RECEIVED
    payload: IUser
}

export default function userReducer(
    state = initialState,
    { type, payload }: UserAction,
) {
    switch (type) {
        case UPDATE_USER:
            state = {
                ...payload,
            }
            userAsyncSave(state)
            return state
        case USER_FETCH_FAILED:
            scheduleSync()
            return state
        case TOKENS_RECEIVED:
            return state
        case LOGOUT_USER:
            removeAll()
            clearFiles()
            resetHints()
            return initialState
        default:
            return state
    }
}
