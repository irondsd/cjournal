import { apiUrl } from '../constants'
import { Post } from './newRequest'

export type UserResponse = {
    _id: string
    sub: string
    username: string
    created_at: number
    updated_at: number
    idinv: string
    patient: null
    identity: Identity
}

export type Identity = {
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

export const login = (access_token: string): Promise<UserResponse> => {
    return new Promise((resolve, reject) => {
        const url = apiUrl + 'login'
        Post(url, access_token)
            .then(res => res.json())
            .then((res: UserResponse) => {
                resolve(res)
            })
            .catch(err => {
                err.error = err.message
                reject(err)
            })
    })
}
