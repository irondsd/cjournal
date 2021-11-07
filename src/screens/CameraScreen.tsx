import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import requestStoragePermission from '../permissions/requestStoragePermission'
import { strings } from '../localization'
import { Splash } from '../components/Splash'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/NavContainer'
import { RouteProp } from '@react-navigation/native'
import { ActivityTypes } from '../constants'

type CameraScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Camera'
>
type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>

type CameraScreenProps = {
    navigation: CameraScreenNavigationProp
    route: CameraScreenRouteProp
}

export const CameraScreen: FC<CameraScreenProps> = ({ navigation, route }) => {
    const [permitted, setPermitted] = useState(false)

    const onBottomButtonPressed = event => {
        if (event.type === 'left') {
            navigation.goBack()
        } else {
            if (event.type === 'right') {
                const { returnTo, sender } = route.params
                const image = event.captureImages?.pop()

                navigation.navigate(returnTo, { sender, image })
            }
        }
    }

    useEffect(() => {
        if (!route.params.returnTo) {
            navigation.goBack()
            Alert.alert('An error occured', 'Please contact the developer')
        }

        requestCameraPermission()
            .then(() => {
                requestStoragePermission()
                    .then(() => {
                        setPermitted(true)
                    })
                    .catch(() => navigation.goBack())
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
