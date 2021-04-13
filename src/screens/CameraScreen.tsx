import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import requestStoragePermission from '../permissions/requestStoragePermission'
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../localization'
import { Splash } from '../components/Splash'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const CameraScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [permitted, setPermitted] = useState(false)

    const onBottomButtonPressed = event => {
        if (event.type === 'left') {
            navigation.goBack()
        } else {
            if (event.type === 'right') {
                const returnTo = navigation.state.params.returnTo
                navigation.navigate(returnTo, {
                    image: event.captureImages[event.captureImages.length - 1],
                })
            }
        }
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

    return (
        <CameraKitCameraScreen
            actions={{
                rightButtonText: strings.Ok,
                leftButtonText: strings.Cancel,
            }}
            onBottomButtonPressed={event => onBottomButtonPressed(event)}
            captureButtonImage={require('../resources/shutter.png')}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
})
