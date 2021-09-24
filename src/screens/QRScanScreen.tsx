import React, { FC, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import { Splash } from '../components/Splash'
import { strings } from '../localization'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/NavContainer'
import { RouteProp } from '@react-navigation/native'

type QRScanScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'QRScan'
>
type QRScanScreenRouteProp = RouteProp<RootStackParamList, 'QRScan'>

type QRScanScreenProps = {
    navigation: QRScanScreenNavigationProp
    route: QRScanScreenRouteProp
}

export const QRScanScreen: FC<QRScanScreenProps> = ({ navigation, route }) => {
    const [permitted, setPermitted] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const onReadCode = qrValue => {
        setHasValue(true)
        const { returnTo } = route.params

        navigation.navigate(returnTo, { qrValue })
    }

    useEffect(() => {
        if (!route.params.returnTo) {
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
