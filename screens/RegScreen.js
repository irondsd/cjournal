import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { appColor } from '../properties'
import { strings } from '../localizations'
import { asyncGetAll, removeScreen, removeAll } from '../services/asyncStorage'
import { setupNotifications } from '../notifications/notifications'
import Barometer from '../sensors/Barometer'

export default class RegScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <StatusBar
                    backgroundColor={appColor}
                    barStyle="light-content"
                />
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>{strings.AppTitle}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
    },
})
