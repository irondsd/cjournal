import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface SplashProps {
    message: string
}

export const Splash: FC<SplashProps> = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        bottom: '15%',
        fontSize: 20,
    },
})
