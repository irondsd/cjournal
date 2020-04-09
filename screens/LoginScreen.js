import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    TouchableHighlight,
    PermissionsAndroid,
    BackHandler,
    Alert,
    StatusBar,
    Keyboard,
} from 'react-native'
import LoginForm from '../components/LoginForm'
import { appColor } from '../constants'
import { strings } from '../localizations'
import { connect } from 'react-redux'
import store from '../redux/store'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import TouchableIcon from '../components/TouchableIcon'

// TODO: browser login

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qrvalue: '',
            opneScanner: false,
            keyboardHidden: true,
        }

        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
    }

    handleBackButton() {
        if (this.state.opneScanner) {
            this.setState({ opneScanner: false })
            return true
        }
        return false
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        store.subscribe(() => {
            if (this.props.tokens.isLoggedIn) {
                this.props.navigation.navigate('App')
            }
        })
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow,
        )
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        )
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    onBarcodeScan(qrvalue) {
        // scan qr here
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

    keyboardDidShow = () => {
        this.setState({ keyboardHidden: false })
    }

    keyboardDidHide = () => {
        this.setState({ keyboardHidden: true })
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
            <KeyboardAvoidingView behavior={null} style={styles.container}>
                <StatusBar
                    backgroundColor={appColor}
                    barStyle="light-content"
                />
                <View
                    style={[
                        styles.logoContainer,
                        this.state.keyboardHidden ? null : { top: -10 },
                    ]}>
                    <Image
                        style={styles.logo}
                        source={require('../resources/logo.png')}
                    />

                    <Text style={styles.title}>{strings.AppTitle}</Text>
                </View>
                <View style={styles.login}>
                    <LoginForm navigation={this.props.navigation} />
                    <TouchableIcon
                        name="qrcode"
                        onPress={() => this.onOpneScanner()}
                        style={styles.qrButton}
                        size={30}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state) {
    return {
        tokens: state.tokens,
    }
}

const mapDispatchToProps = {
    // updateUser,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen)

const logoSize = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logoContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '22%',
    },
    logo: {
        width: logoSize,
        height: logoSize - 10,
    },
    title: {
        color: 'white',
        fontSize: 30,
    },
    login: {
        margin: 20,
    },
    qrButton: {
        position: 'absolute',
        bottom: '1%',
        left: 6,
        padding: 10,
    },
})
