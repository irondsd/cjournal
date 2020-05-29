import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../localization'
import { decode } from '../helpers/encode'
import { paths } from '../constants'

export default class QRScanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { isPermitted: false }

        this.verifyPermissions = this.verifyPermissions.bind(this)
    }

    componentDidMount() {
        this.verifyPermissions()
    }

    async verifyPermissions() {
        let camera = await requestCameraPermission()
        if (camera) {
            this.setState({ isPermitted: true })
        } else {
            this.props.navigation.goBack()
        }
    }

    onBarcodeScan(qrvalue) {
        let decoded = decode(qrvalue)

        if (decoded)
            this.props.navigation.navigate(paths.Settings, { qrValue: decoded })
    }

    render() {
        return (
            <CameraKitCameraScreen
                showFrame={true}
                scanBarcode={true}
                laserColor={'blue'}
                frameColor={'yellow'}
                colorForScannerFrame={'black'}
                onReadCode={event =>
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                }
            />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
})
