import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { logoutUser, addActivity } from '../../redux/actions'
import {
    backgroundColor,
    paths,
    activityTypes,
    defaultStyles,
    borderGrey,
} from '../../constants'
import { strings } from '../../localization'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import Icon from 'react-native-vector-icons/FontAwesome'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import requestCameraPermission from '../../permissions/requestCameraPermissions'
import SaveButton from '../../components/SaveButton'
import DeviceIdInput from '../../components/DeviceIdInput'
import { cancelLocalNotification } from '../../notifications/notifications'
import { getUtcOffset } from '../../helpers/dateTime'

class DeviceInstallScreen extends Component {
    static navigationOptions = {
        title: strings.DeviceInstall,
        headerLeft: null,
    }

    state = {
        opneScanner: false,
        device_id: '',
        tasks_id: null,
    }

    componentDidMount() {
        this.setState({
            tasks_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.tasks_id
                : null,
        })
    }

    record() {
        let tasks_id = this.state.tasks_id
            ? parseInt(this.state.tasks_id)
            : null
        if (tasks_id) cancelLocalNotification(tasks_id)
        let activity = Activity.init(
            activityTypes.DeviceInstall,
            timestamp(),
            null,
            tasks_id,
            this.props.user.idinv,
            '',
            { device_id: this.state.device_id },
        )
        console.log(activity)
        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    onBarcodeScan(qrvalue) {
        //called after te successful scanning of QRCode/Barcode
        this.setState({ device_id: qrvalue })
        this.setState({ opneScanner: false })
    }

    onOpenScanner = () => {
        //To Start Scanning
        if (Platform.OS === 'android') {
            //Calling the camera permission function
            if (requestCameraPermission()) {
                this.setState({ qrvalue: '' })
                this.setState({ opneScanner: true })
            }
        } else {
            this.setState({ qrvalue: '' })
            this.setState({ opneScanner: true })
        }
    }

    render() {
        if (this.state.opneScanner) {
            return (
                <View style={{ flex: 1 }}>
                    <CameraKitCameraScreen
                        showFrame={true}
                        //Show/hide scan frame
                        scanBarcode={true}
                        //Can restrict for the QR Code only
                        laserColor={'blue'}
                        //Color can be of your choice
                        frameColor={'yellow'}
                        //If frame is visible then frame color
                        colorForScannerFrame={'black'}
                        //Scanner Frame color
                        onReadCode={event =>
                            this.onBarcodeScan(
                                event.nativeEvent.codeStringValue,
                            )
                        }
                    />
                </View>
            )
        }

        return (
            <View style={defaultStyles.container}>
                <DeviceIdInput
                    value={this.state.device_id}
                    onOpenScanner={this.onOpenScanner}
                    setText={text => {
                        this.setState({ device_id: text })
                    }}
                />
                <SaveButton
                    title={strings.Save}
                    onPress={() => {
                        this.record.bind(this)
                        this.record()
                    }}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceInstallScreen)
