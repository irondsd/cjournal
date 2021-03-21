import { IUser } from '../reducers/userReducer'
import {
    UPDATE_USER,
    IDENTITY_USER,
    USER_FETCH_FAILED,
    LOGOUT_USER,
} from '../types'

export const updateUser = (user: IUser) => {
    return {
        type: UPDATE_USER,
        payload: user,
    }
}

export const userFetchFailed = () => {
    return {
        type: USER_FETCH_FAILED,
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}
