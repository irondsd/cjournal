import { PermissionsAndroid, Platform } from 'react-native'

export default async function requestLocationPermissions() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                // TODO: translate
                title: 'Cardio Tracker',
                message:
                    'We need your location to better calculate the distance.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location')
            return true
        } else {
            console.log('Location permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
