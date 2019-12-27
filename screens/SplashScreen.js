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
import { appColor } from '../properties'
import {
    updateUser,
    replaceActivities,
    replaceTasks,
    loadNotifications,
    tokensReceived,
} from '../redux/actions'
import { strings } from '../localizations'
import { asyncGetAll, removeScreen, removeAll } from '../services/asyncStorage'
import { setupNotifications } from '../notifications/notifications'
// import sync from '../services/sync'
import Barometer from '../sensors/Barometer'
// import { readStateFile } from '../services/idinv'

class SplashScreen extends Component {
    constructor(props) {
        super(props)
        // setupNotifications()
    }

    componentDidMount() {
        // Barometer.calibrate()
        asyncGetAll()
            .then(res => {
                if (res.tokens) this.props.tokensReceived(res.tokens)
                if (res.user) this.props.updateUser(res.user)
                if (res.activity) this.props.replaceActivities(res.activity)
                if (res.tasks) this.props.replaceTasks(res.tasks)
                if (res.notifications)
                    this.props.loadNotifications(res.notifications)

                if (res.tokens) {
                    // TODO:  update tokens
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
}

export default connect(null, mapDispatchToProps)(SplashScreen)

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
