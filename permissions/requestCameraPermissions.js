import {PermissionsAndroid} from 'react-native'

export default async function requestLocationPermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                // TODO: translate
                title: 'Camera Permission',
                message: 'Cardio Journal needs access to your camera',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera')
            return true
        } else {
            alert(strings.CamPermDenied)
            console.log('Location permission denied')
            return false
        }
    } catch (err) {
        alert(strings.CamPermDenied, err)
        console.warn(err)
        return false
    }
}
