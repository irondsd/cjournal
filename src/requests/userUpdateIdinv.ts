import { Put } from './newRequest'

export default function userUpdateIdinv(
    _id: string,
    access_token: string,
    idinv: string,
): Promise<any> {
    return Put(`users/${_id}/`, access_token, { idinv: idinv })
}
