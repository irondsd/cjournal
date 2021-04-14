import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import { Splash } from '../components/Splash'
import { strings } from '../localization'

export const QRScanScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [permitted, setPermitted] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const onReadCode = qrValue => {
        setHasValue(true)
        const returnTo = navigation.state.params.returnTo

        navigation.navigate(returnTo, { qrValue })
    }

    useEffect(() => {
        if (!navigation.state.params.returnTo) {
            navigation.goBack()
            Alert.alert('An error occured', 'Please contact the developer')
        }

        requestCameraPermission()
            .then(() => {
                setPermitted(true)
            })
            .catch(() => navigation.goBack())
    }, [])

    if (!permitted) return <Splash message={strings.WaitingPermissions} />
    if (hasValue) return null

    return (
        <CameraKitCameraScreen
            // showFrame={true}
            scanBarcode={true}
            // laserColor={'blue'}
            // frameColor={'yellow'}
            // colorForScannerFrame={'black'}
            onReadQRCode={event => {
                onReadCode(event.nativeEvent.codeStringValue)
            }}
            onReadCode={event => {
                onReadCode(event.nativeEvent.codeStringValue)
            }}
        />
    )
}

QRScanScreen.navigationOptions = () => {
    return { header: null }
}
