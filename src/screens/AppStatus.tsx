import React, { FC, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { backgroundColor } from '../constants'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/NavContainer'
import { RouteProp } from '@react-navigation/native'
import { AppStatus } from '../components/AppStatus'
import { strings } from '../localization'

type AppStatusScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AppStatus'
>
type AppStatusScreenRouteProp = RouteProp<RootStackParamList, 'AppStatus'>

type AppStatusScreenProps = {
    navigation: AppStatusScreenNavigationProp
    route: AppStatusScreenRouteProp
}

export const AppStatusScreen: FC<AppStatusScreenProps> = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: strings.AppStatus,
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <AppStatus />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
})
