import { PermissionsAndroid, Platform } from 'react-native'

export default async function requestLocationPermissions() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                // TODO: translate
                title: 'Microphone permissions',
                message: 'We need microphone access to record audio',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the microphone')
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
