import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import { appColor } from '../constants'
import {
    updateUser,
    replaceActivities,
    replaceTasks,
    loadNotifications,
    tokensReceived,
    loadSettings,
} from '../redux/actions'
import { strings } from '../localization'
import { asyncGetAll, removeScreen, removeAll } from '../services/asyncStorage'
import Barometer from '../sensors/Barometer'
import { idinvWatcher } from '../services/idinvWatcher'
import { requestExternalReadPermission } from '../permissions/requestStoragePermission'

class SplashScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Barometer.calibrate(30)
        requestExternalReadPermission()
        asyncGetAll()
            .then(res => {
                if (res.tokens) this.props.tokensReceived(res.tokens)
                if (res.user) {
                    this.props.updateUser(res.user)
                    if (res.user.id && res.tokens.access_token) {
                        idinvWatcher(
                            res.user.id,
                            res.tokens.access_token,
                            res.user.idinv,
                        )
                    }
                }
                if (res.activity) this.props.replaceActivities(res.activity)
                if (res.tasks) this.props.replaceTasks(res.tasks)
                if (res.notifications)
                    this.props.loadNotifications(res.notifications)
                if (res.settings) this.props.loadSettings(res.settings)
                if (res.tokens) {
                    if (res.screen) {
                        this.props.navigation.navigate(
                            res.screen.screen,
                            res.screen,
                        )
                        removeScreen() // to prevent it to reopen next time
                    } else {
                        this.props.navigation.navigate('App')
                    }
                } else {
                    this.props.navigation.navigate('Auth')
                }
            })
            .catch(err => {
                // error
                console.log('error reading storage', err)
                this.props.navigation.navigate('Welcome')
            })
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
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
            </View>
        )
    }
}

const mapDispatchToProps = {
    replaceActivities,
    replaceTasks,
    updateUser,
    loadNotifications,
    tokensReceived,
    loadSettings,
}

export default connect(
    null,
    mapDispatchToProps,
)(SplashScreen)

const logoSize = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor,
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        top: '22%',
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    title: {
        color: 'white',
        fontSize: 30,
    },
})
