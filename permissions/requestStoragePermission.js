import { PermissionsAndroid, Platform } from 'react-native'
import { strings } from '../localizations'

export default async function requestExternalWritePermission() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: strings.StoragePermissions,
                message: strings.StoragePermissionsMessage,
                buttonNeutral: strings.AskMeLater,
                buttonNegative: strings.Cancel,
                buttonPositive: strings.Ok,
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Write storage granted')
            return await requestExternalReadPermission()
        } else {
            console.log('Write permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
async function requestExternalReadPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: strings.StoragePermissions,
                message: strings.StoragePermissionsMessage,
                buttonNeutral: strings.AskMeLater,
                buttonNegative: strings.Cancel,
                buttonPositive: strings.Ok,
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Read storage granted')
            return true
        } else {
            console.log('Read permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
