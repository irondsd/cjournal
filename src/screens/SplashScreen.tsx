import React, { useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { appColor, width } from '../constants'
import {
    updateUser,
    replaceActivities,
    loadTasks,
    tokensLoaded,
    loadSettings,
    setIdinvFilter,
} from '../redux/actions'
import { strings } from '../localization'
import { asyncGetAll, removeScreen } from '../services/asyncStorage'
import Barometer from '../sensors/Barometer'
import { idinvWatcher } from '../services/idinvWatcher'
import { requestExternalReadPermission } from '../permissions/requestStoragePermission'
import { Logo } from '../components/Logo'
import { writeLog } from '../services/logger'
import timestamp from '../helpers/timestamp'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { RootState } from '../redux/store'

const logoSize = width / 2

export const SplashScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        Barometer.calibrate(30)
        requestExternalReadPermission()

        asyncGetAll()
            .then(res => {
                if (res.settings) dispatch(loadSettings(res.settings))
                if (res.tokens) dispatch(tokensLoaded(res.tokens))
                if (res.user) {
                    // ! refactor
                    dispatch(updateUser(res.user))
                    if (res.user._id && res.tokens.access_token) {
                        idinvWatcher(
                            res.user._id,
                            res.tokens.access_token,
                            res.user.idinv,
                        )
                    }

                    if (res.user.idinv) {
                        dispatch(setIdinvFilter(true))
                    } else {
                        dispatch(setIdinvFilter(false))
                    }
                }
                if (res.activity) dispatch(replaceActivities(res.activity))
                if (res.tasks) dispatch(loadTasks(res.tasks))
                if (res.tokens) {
                    if (res.screen) {
                        navigation.navigate(res.screen.screen, res.screen)
                        removeScreen() // to prevent it to reopen next time
                    } else {
                        navigation.navigate('App')
                    }
                } else {
                    navigation.navigate('Auth')
                }
            })
            .catch(err => {
                // error
                writeLog('error', 'error reading storage ' + timestamp())
                navigation.navigate('Welcome')
            })
    }, [])

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
