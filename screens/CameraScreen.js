import React, { Component } from 'react'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import requestStoragePermission from '../permissions/requestStoragePermission'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class CameraScreen extends Component {
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
        let storage = await requestStoragePermission()
        if (camera && storage) {
            this.setState({ isPermitted: true })
        } else {
            this.props.navigation.goBack()
        }
    }

    onBottomButtonPressed(event) {
        const captureImages = JSON.stringify(event.captureImages)
        if (event.type === 'left') {
            this.props.navigation.goBack()
        } else {
            if (event.type === 'right') {
                let returnTo = this.props.navigation.state.params.returnTo
                this.props.navigation.navigate(returnTo, {
                    image: event.captureImages[event.captureImages.length - 1],
                })
            }
        }
    }
    render() {
        if (this.state.isPermitted) {
            return (
                <CameraKitCameraScreen
                    actions={{
                        rightButtonText: 'Done',
                        leftButtonText: 'Cancel',
                    }}
                    onBottomButtonPressed={event =>
                        this.onBottomButtonPressed(event)
                    }
                    captureButtonImage={require('../resources/shutter.png')}
                />
            )
        } else {
            return <View style={styles.container}></View>
        }
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
