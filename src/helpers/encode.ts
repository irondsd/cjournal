import { qrEncodePrefix } from '../constants'
import base64 from 'react-native-base64'

export function encode(value: string): string {
    return qrEncodePrefix + ':' + base64.encode(value)
}

export function decode(value: string): string | undefined {
    const [prefix, base64String] = value.split(':')

    if (prefix === qrEncodePrefix) {
        if (!base64String) return
        if (!isValidBase64(base64String)) return

        return base64.decode(base64String)
    }
    return
}

function isValidBase64(string: string): boolean {
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    return base64regex.test(string)
}
