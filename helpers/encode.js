import { qrEncodePrefix } from '../constants'
import base64 from 'react-native-base64'

export function encode(value) {
    return qrEncodePrefix + ' ' + base64.encode(value)
}

export function decode(value) {
    let test = value.split(' ')

    if (test[0] === qrEncodePrefix) {
        return base64.decode(test[1])
    } else {
        return
    }
}
