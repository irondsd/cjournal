import React, { useEffect } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Alert,
} from 'react-native'
import { appColor, Routes, logoSize } from '../constants'
import { strings } from '../localization'
import { RegisterOrLogin } from '../components/RegisterOrLogin'
import { Logo } from '../components/Logo'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const WelcomeScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const showMessage = () => {
        if (navigation?.state?.params?.message) {
            Alert.alert(strings.Success, navigation.state.params.message)
        }
    }

    useEffect(() => {
        showMessage()
    }, [navigation.state?.params])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={appColor} barStyle="light-content" />
            <View style={styles.logoContainer}>
                <Logo size={logoSize} />
                <Text style={styles.title}>{strings.AppTitle}</Text>
            </View>
            <RegisterOrLogin navigation={navigation} />
        </View>
    )
}

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
    title: {
        color: 'white',
        fontSize: 30,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    },
    login: {
        margin: 20,
    },
})
