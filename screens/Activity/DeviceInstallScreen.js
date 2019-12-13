import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    PermissionsAndroid,
    TextInput,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { logoutUser, addActivity } from '../../redux/actions'
import { backgroundColor, paths, activity_types } from '../../properties'
import { strings } from '../../localizations'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import Icon from 'react-native-vector-icons/FontAwesome'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import requestCameraPermission from '../../permissions/requestCameraPermissions'

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
        if (tasks_id) cancelNotification(tasks_id)
        let activity = new Activity(
            null,
            activity_types.DeviceInstall,
            timestamp(),
            null,
            tasks_id,
            timestamp(),
            '',
            {
                device_id: this.state.device_id,
            },
        )
        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    onBarcodeScan(qrvalue) {
        //called after te successful scanning of QRCode/Barcode
        this.setState({ device_id: qrvalue })
        this.setState({ opneScanner: false })
    }

    onOpneScanner() {
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
            <View style={styles.container}>
                <View style={styles.inputBlock}>
                    <TextInput
                        placeholder={strings.DeviceId}
                        multiline={true}
                        maxLength={80}
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={true}
                        returnKeyType="next"
                        onChangeText={text => {
                            this.setState({
                                device_id: text,
                            })
                        }}
                        value={this.state.device_id}
                    />
                    <Icon
                        name={'qrcode'}
                        size={40}
                        color={'black'}
                        style={styles.icon}
                        onPress={() => {
                            this.onOpneScanner()
                        }}
                    />
                </View>
                <Button
                    style={styles.button}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInstallScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    inputBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        flex: 2,
        margin: 20,
        justifyContent: 'flex-end',
    },
    input: {
        fontSize: 20,
        backgroundColor: 'whitesmoke',
        color: 'black',
        padding: 10,
        width: '87%',
    },
    icon: {
        margin: 7,
    },
})
