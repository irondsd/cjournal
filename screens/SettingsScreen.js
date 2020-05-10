import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Linking,
    TouchableWithoutFeedback,
} from 'react-native'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { backgroundColor, profileEditUrl } from '../constants'
import { strings } from '../localizations'
import TouchableIcon from '../components/TouchableIcon'
import SaveButton from '../components/SaveButton'
import ToggleSwitch from '../components/ToggleSwitch'
import { version } from '../package.json'
import { displayName } from '../app.json'
import {
    setNotifications,
    setIdinvFilter,
    setNotificationDelay,
} from '../redux/actions'
import NumInput from '../components/SettingsNumInput'

class SettingsScreen extends Component {
    state = {
        devSettingsHidden: true,
    }

    static navigationOptions = {
        title: strings.Settings,
        headerRight: (
            <TouchableIcon
                name="qrcode"
                color="#000"
                size={25}
                style={{ right: 15 }}
            />
        ),
    }

    logout() {
        this.props.logout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
                <TouchableWithoutFeedback
                    delayLongPress={3000}
                    onLongPress={() => {
                        this.setState({
                            devSettingsHidden: !this.state.devSettingsHidden,
                        })
                    }}>
                    <Text style={styles.information}>{`${displayName} - ${
                        strings.Version
                    }: ${version}`}</Text>
                </TouchableWithoutFeedback>
                <View />
                <Text style={styles.name}>{this.props.user.username}</Text>
                {this.props.user.idinv ? (
                    <Text style={styles.information}>{`${strings.idinv}: ${
                        this.props.user.idinv
                    }`}</Text>
                ) : null}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
    },
    email: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    information: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
})
