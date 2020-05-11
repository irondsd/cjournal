import { PermissionsAndroid, Platform } from 'react-native'
import { strings } from '../localization'

export default async function requestLocationPermissions() {
    if (Platform.OS === 'ios') return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: strings.LocationPermissions,
                message: strings.LocationPermissionsMessage,
                buttonNeutral: strings.AskMeLater,
                buttonNegative: strings.Cancel,
                buttonPositive: strings.Ok,
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('Location permissions granted')
            return true
        } else {
            // console.log('Location permission denied')
            return false
        }
    } catch (err) {
        console.warn(err)
        return false
    }
}
