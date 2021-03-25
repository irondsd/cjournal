import { apiUrl } from '../constants'
import { Put } from './newRequest'

export default function userUpdateIdinv(
    _id: string,
    access_token: string,
    idinv: string,
): Promise<any> {
    const url = apiUrl + `users/${_id}/`
    return Put(url, access_token, { idinv: idinv })
}
