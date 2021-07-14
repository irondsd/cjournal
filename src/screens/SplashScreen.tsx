import React, { FC } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { appColor, logoSize } from '../constants'
import { strings } from '../localization'
import { Logo } from '../components/Logo'

export const SplashScreen: FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={appColor} barStyle="light-content" />
            <View style={styles.logoContainer}>
                <Logo size={logoSize} />
                <Text style={styles.title}>{strings.AppTitle}</Text>
            </View>
        </View>
    )
}

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
