import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../localization'
import { paths } from '../constants'

export default class QRScanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPermitted: false,
            success: false,
        }

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
        if (!this.state.success) {
            this.setState({ success: true })
            let returnTo = this.props.navigation.state.params.returnTo

            this.props.navigation.navigate(returnTo, {
                qrValue: qrvalue,
            })
        }
    }

    render() {
        if (this.state.success) return null
        if (!this.state.isPermitted) return null
        return (
            <CameraKitCameraScreen
                // showFrame={true}
                scanBarcode={true}
                // laserColor={'blue'}
                // frameColor={'yellow'}
                // colorForScannerFrame={'black'}
                onReadQRCode={event => {
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                }}
                onReadCode={event => {
                    this.onBarcodeScan(event.nativeEvent.codeStringValue)
                }}
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
