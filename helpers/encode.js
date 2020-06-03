import { qrEncodePrefix } from '../constants'
import base64 from 'react-native-base64'

export function encode(value) {
    return qrEncodePrefix + ' ' + base64.encode(value)
}

export function decode(value) {
    let test = value.split(' ')

    if (test[0] === qrEncodePrefix) {
        let base64String = test[1]

        if (!base64String) return
        if (!isValidBase64(base64String)) return

        return base64.decode(base64String)
    } else {
        return
    }
}

function isValidBase64(string) {
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    console.log(base64regex.test(string))
    return base64regex.test(string)
}
