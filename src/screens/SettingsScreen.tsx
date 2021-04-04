import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Linking,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { backgroundColor, profileEditUrl } from '../constants'
import { strings } from '../localization'
import SaveButton from '../components/SaveButton'
import ToggleSwitch from '../components/ToggleSwitch'
import { version } from '../../package.json'
import { displayName } from '../../app.json'
import {
    setNotifications,
    setIdinvFilter,
    setNotificationDelay,
    updateUser,
    userFetchFailed,
} from '../redux/actions'
import NumInput from '../components/SettingsNumInput'
import userUpdateIdinv from '../requests/userUpdateIdinv'
import store, { RootState } from '../redux/store'
import { decodeIdinv } from '../helpers/encode'
import { IdinvBlock } from '../components/IdinvBlock'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Get } from '../requests/newRequest'

export const SettingsScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [settingsShow, setSettingsShow] = useState(false)
    const [idinvChanging, setIdinvChanging] = useState(false)
    const [presses, setPresses] = useState(0)

    const user = useSelector((state: RootState) => state.user)
    const tokens = useSelector((state: RootState) => state.tokens)
    const settings = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
        // navigation.navigate('Auth')
    }

    const setIdinv = (idinv: string) => {
        setIdinvChanging(true)
        userUpdateIdinv(user._id, tokens.access_token, idinv)
            .then(res => {
                if (res.ok) {
                    Alert.alert(strings.Success, strings.IdinvChangeSuccess)
                    Get(`users/${user._id}`, tokens.access_token)
                        .then(res => dispatch(updateUser(res)))
                        .catch(err => dispatch(userFetchFailed())),
                        setIdinvFilter(true)
                    setIdinvChanging(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const checkIncomingQR = () => {
        if (idinvChanging) return
        if (navigation.state?.params?.qrValue) {
            const qrValue = navigation.state.params.qrValue

            // decode and check for errors
            const idinv = decodeIdinv(qrValue)

            if (!idinv) return Alert.alert(strings.Error, strings.ErrQR) // qr scanned didn't have idinv
            if (user.idinv === idinv)
                return Alert.alert(strings.Error, strings.SameQR) // we scanned idinv that is already set to user

            // we have idinv and it doesn't match user's idinv
            // let's change it
            setIdinv(idinv)
        }
    }

    useEffect(() => {
        checkIncomingQR()
    }, [navigation.state.params])

    useEffect(() => {
        const title = navigation.setParams({
            headerTitle: strings['Settings'],
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <TouchableWithoutFeedback
                onPress={() => {
                    setPresses(prev => (prev += 1))

                    setTimeout(() => {
                        setPresses(0)
                    }, 3000)

                    if (presses >= 10) {
                        navigation.navigate('Debug')
                    }
                }}
                delayLongPress={3000}
                onLongPress={() => {
                    setSettingsShow(prev => !prev)
                }}>
                <Text
                    style={
                        styles.information
                    }>{`${displayName} - ${strings.Version}: ${version}`}</Text>
            </TouchableWithoutFeedback>
            <View />
            <Text style={styles.name}>{user.username}</Text>
            {settingsShow ? (
                <View>
                    <ToggleSwitch
                        text={strings.IdinvFilter}
                        value={settings.idinvFilter}
                        onValueChange={value => dispatch(setIdinvFilter(value))}
                    />
                    <ToggleSwitch
                        text={strings.Notifications}
                        value={settings.notifications}
                        onValueChange={value =>
                            dispatch(setNotifications(value))
                        }
                    />
                    <NumInput
                        text={strings.PostponeNotificationsBy}
                        value={`${settings.notificationDelay}`}
                        onValueChange={value => {
                            dispatch(setNotificationDelay(value))
                        }}
                    />
                </View>
            ) : (
                <IdinvBlock idinv={user.idinv} />
            )}
            <View style={styles.buttonView}>
                <View>
                    <SaveButton
                        title={strings.EditProfile}
                        onPress={() => {
                            Linking.openURL(profileEditUrl).catch(err =>
                                console.error('An error occurred', err),
                            )
                        }}
                    />
                </View>
                <View>
                    <SaveButton
                        title={strings.Logout}
                        onPress={() => {
                            logout()
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

SettingsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
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
    name: {
        fontSize: 30,
        margin: 20,
    },
    information: {
        fontSize: 15,
    },
    email: {
        fontSize: 15,
        margin: 10,
    },
    buttonView: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
})
