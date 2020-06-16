import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native'
import { appColor, paths } from '../constants'
import { strings } from '../localization'
import RegisterOrLogin from '../components/RegisterOrLogin'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'

export default class WelcomeScreen extends Component {
    componentDidMount() {
        this.checkMessage()
    }

    componentDidUpdate() {
        this.checkMessage()
    }

    checkMessage = () => {
        if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.message
        ) {
            Alert.alert(
                strings.Success,
                this.props.navigation.state.params.message,
            )
        }
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
                <RegisterOrLogin
                    register={() =>
                        this.props.navigation.navigate(paths.Register)
                    }
                />
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
