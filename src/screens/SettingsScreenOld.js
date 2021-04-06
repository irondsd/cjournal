import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Linking,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { backgroundColor, profileEditUrl, paths } from '../constants'
import { strings } from '../localization'
import { TouchableIcon } from '../components/TouchableIcon'
import SaveButton from '../components/SaveButton'
import ToggleSwitch from '../components/ToggleSwitch'
import { version } from '../../package.json'
import { displayName } from '../../app.json'
import {
    setNotifications,
    setIdinvFilter,
    setNotificationDelay,
} from '../redux/actions'
import NumInput from '../components/SettingsNumInput'
import userUpdateIdinv from '../requests/userUpdateIdinv'
import store from '../redux/store'
import { decodeIdinv } from '../helpers/encode'
import { IdinvBlock } from '../components/IdinvBlock'

class SettingsScreen extends Component {
    shortPresses = 0

    state = {
        devSettingsHidden: true,
        idinvSetTo: '',
        idinvChangeInProgress: false,
    }

    static navigationOptions = ({ navigation }) => ({
        title: strings.Settings,
        headerRight: (
            <TouchableIcon
                name="qrcode"
                color="#000"
                size={25}
                style={{ margin: 15 }}
                onPress={() => {
                    navigation.navigate(paths.QRScan, {
                        returnTo: paths.Settings,
                    })
                }}
            />
        ),
    })

    logout() {
        this.props.logout()
        setTimeout(() => {
            this.props.navigation.navigate('Auth')
        }, 100)
    }

    componentDidUpdate() {
        this.checkIncomingQR()
    }

    checkIncomingQR = () => {
        if (this.state.idinvChangeInProgress) return
        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.qrValue) {
                const qrValue = this.props.navigation.state.params.qrValue

                // decode and check for errors
                const decoded = decode(qrValue)

                if (!decoded) return Alert.alert(strings.Error, strings.ErrQR)

                if (this.state.idinvSetTo === decoded) return

                if (this.props.user.idinv === decoded)
                    return Alert.alert(strings.Error, strings.SameQR)

                this.setIdinv(decoded)
            }
        }
    }

    setIdinv(idinv) {
        this.setState({
            idinvSetTo: idinv,
            idinvChangeInProgress: true,
        })
        userUpdateIdinv(this.props._id, this.props.access_token, idinv)
            .then(res => {
                if (res.ok) {
                    Alert.alert(strings.Success, strings.IdinvChangeSuccess)
                    Get(`users/${this.props._id}`, this.props.access_token)
                        .then(res => store.dispatch(updateUser(res)))
                        .catch(err => store.dispatch(userFetchFailed())),
                        this.props.setIdinvFilter(true)
                    this.setState({ idinvChangeInProgress: false })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    idinvSetTo: '',
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.shortPresses += 1

                        setTimeout(() => {
                            this.shortPresses = 0
                        }, 3000)

                        if (this.shortPresses >= 10) {
                            this.props.navigation.navigate('Debug')
                        }
                    }}
                    delayLongPress={3000}
                    onLongPress={() => {
                        this.setState({
                            devSettingsHidden: !this.state.devSettingsHidden,
                        })
                    }}>
                    <Text
                        style={
                            styles.information
                        }>{`${displayName} - ${strings.Version}: ${version}`}</Text>
                </TouchableWithoutFeedback>
                <View />
                <Text style={styles.name}>{this.props.user.username}</Text>
                <View
                    style={
                        this.state.devSettingsHidden
                            ? { display: 'none' }
                            : null
                    }>
                    <ToggleSwitch
                        text={strings.IdinvFilter}
                        value={this.props.idinvFilter}
                        onValueChange={value =>
                            this.props.setIdinvFilter(value)
                        }
                    />
                    <ToggleSwitch
                        text={strings.Notifications}
                        value={this.props.notifications}
                        onValueChange={value =>
                            this.props.setNotifications(value)
                        }
                    />
                    <NumInput
                        text={strings.PostponeNotificationsBy}
                        value={'' + this.props.notificationDelay}
                        onValueChange={value => {
                            this.props.setNotificationDelay(value)
                        }}
                    />
                </View>
                <IdinvBlock idinv={this.props.user.idinv} />
                <View style={styles.buttonView}>
                    <View>
                        <SaveButton
                            title={strings.EditProfile}
                            onPress={() => {
                                Linking.openURL(profileEditUrl).catch(err =>
                                    console.error('An error occurred', err),
                                )
                            }}
                        />
                    </View>
                    <View>
                        <SaveButton
                            title={strings.Logout}
                            onPress={() => {
                                this.logout()
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        notifications: state.settings.notifications,
        idinvFilter: state.settings.idinvFilter,
        notificationDelay: state.settings.notificationDelay,
        _id: state.user._id,
        access_token: state.tokens.access_token,
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logoutUser())
    },
    setNotifications: value => {
        dispatch(setNotifications(value))
    },
    setIdinvFilter: value => {
        dispatch(setIdinvFilter(value))
    },
    setNotificationDelay: value => {
        dispatch(setNotificationDelay(value))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    name: {
        fontSize: 30,
        margin: 20,
    },
    information: {
        fontSize: 15,
    },
    email: {
        fontSize: 15,
        margin: 10,
    },
    buttonView: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
})