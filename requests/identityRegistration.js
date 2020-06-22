import { identityRegistrationUrl } from '../constants'

export function identityRegistration(email, password) {
    let formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return fetch(identityRegistrationUrl, {
        method: 'POST',
        body: formData,
    })
}
