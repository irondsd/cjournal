import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native'
import { appColor } from '../properties'
import { strings } from '../localizations'
import RegButton from '../components/RegButton'
import RegisterOrLogin from '../components/RegisterOrLogin'

export default class WelcomeScreen extends Component {
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
                <RegisterOrLogin />
            </View>
        )
    }
}

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
    },
})
