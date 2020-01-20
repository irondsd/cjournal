import { PermissionsAndroid, Platform } from 'react-native'
import { strings } from '../localizations'

export default async function requestLocationPermissions() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: strings.CameraPermissions,
                message: strings.CameraPermissionsMessage,
                buttonNeutral: strings.AskMeLater,
                buttonNegative: strings.Cancel,
                buttonPositive: strings.Ok,
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permissions granted')
            return true
        } else {
            console.log('Camera permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
