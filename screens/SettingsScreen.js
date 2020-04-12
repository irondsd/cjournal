import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Linking,
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
import { setNotifications, setIdinvFilter } from '../redux/actions'

class SettingsScreen extends Component {
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
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <Text style={styles.information}>{`${displayName} - ${
                    strings.Version
                }: ${version}`}</Text>
                <View />
                <Text style={styles.name}>{this.props.user.username}</Text>
                {this.props.user.idinv && (
                    <Text style={styles.information}>{`${strings.idinv}: ${
                        this.props.user.idinv
                    }`}</Text>
                )}
                <View>
                    <ToggleSwitch
                        text={'Idinv filter'}
                        value={this.props.idinvFilter}
                        onValueChange={value =>
                            this.props.setIdinvFilter(value)
                        }
                    />
                    <ToggleSwitch
                        text={'Notifications'}
                        value={this.props.notifications}
                        onValueChange={value =>
                            this.props.setNotifications(value)
                        }
                    />
                </View>
                <View style={styles.buttonView}>
                    <View>
                        <SaveButton
                            title={strings.EditProfile}
                            style={styles.button}
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
                            style={styles.button}
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
        justifyContent: 'space-between',
        padding: 20,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
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
    button: {
        margin: 10,
        padding: 20,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
