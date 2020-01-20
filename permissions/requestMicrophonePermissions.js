import { PermissionsAndroid, Platform } from 'react-native'
import { strings } from '../localizations'

export default async function requestLocationPermissions() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: strings.MicrophonePermissions,
                message: strings.MicrophonePermissionsMessage,
                buttonNeutral: strings.AskMeLater,
                buttonNegative: strings.Cancel,
                buttonPositive: strings.Ok,
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Microphone permissions granted')
            return true
        } else {
            console.log('Microphone permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
