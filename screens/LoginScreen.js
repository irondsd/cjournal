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
} from 'react-native'
import LoginForm from '../components/LoginForm'
import { appColor } from '../properties'
import { strings } from '../localizations'
import { connect } from 'react-redux'
import store from '../redux/store'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import SimpleCrypto from 'simple-crypto-js'
import { secretKey } from '../properties'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import TouchableIcon from '../components/TouchableIcon'

const behavior = Platform.OS === 'ios' ? 'padding' : 'padding'
const simpleCrypto = new SimpleCrypto(secretKey)

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qrvalue: '',
            opneScanner: false,
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
    }

    onBarcodeScan(qrvalue) {
        //called after te successful scanning of QRCode/Barcode
        this.setState({ qrvalue: qrvalue })
        this.setState({ opneScanner: false })

        let decipherText
        try {
            decipherText = simpleCrypto.decrypt(qrvalue)
        } catch (error) {
            Alert.alert(strings.Error, strings.ErrQR)
            return
        }
        let results = JSON.parse(decipherText)

        // this.props.updateUser(results)

        if (results.api_key) {
            this.props.navigation.navigate('App')
        }
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
            <KeyboardAvoidingView behavior={behavior} style={styles.container}>
                <StatusBar
                    backgroundColor={appColor}
                    barStyle="light-content"
                    // hidden={true}
                />
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../resources/logo.png')}
                    />

                    <Text style={styles.title}>{strings.AppTitle}</Text>
                </View>
                <View style={styles.login}>
                    <LoginForm navigation={this.props.navigation} />
                    {/* <QRScanButton callback={() => this.onOpneScanner()} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const logoSize = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor,
        alignItems: 'center',
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        top: '22%',
        paddingBottom: '10%',
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    title: {
        color: 'white',
        fontSize: 30,
    },
    login: {
        margin: 20,
        bottom: '3%',
    },
    qrButton: {
        position: 'absolute',
        bottom: '1%',
        left: 5,
        padding: 10,
    },
})
