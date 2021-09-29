import React, { FC, useState, useEffect, useLayoutEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Linking,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native'
import {
    backgroundColor,
    Routes,
    profileEditUrl,
    ActivityTypes,
} from '../constants'
import { strings } from '../localization'
import { Button } from '../components/Button'
import { ToggleSwitch } from '../components/settings/ToggleSwitch'
import { version } from '../../package.json'
import { displayName } from '../../app.json'
import { NumInput } from '../components/settings/NumInput'
import userUpdateIdinv from '../requests/userUpdateIdinv'
import { decodeIdinv } from '../helpers/encode'
import { IdinvBlock } from '../components/IdinvBlock'
import { Get } from '../requests/newRequest'
import { TouchableIcon } from '../components/TouchableIcon'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/NavContainer'
import { RouteProp } from '@react-navigation/native'
import { useUser } from '../context/userContext'
import { useAuth } from '../context/authContext'
import { useSettings } from '../context/settingsContext'

type SettingsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Settings'
>
type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>

type SettingsScreenProps = {
    navigation: SettingsScreenNavigationProp
    route: SettingsScreenRouteProp
}

export const SettingsScreen: FC<SettingsScreenProps> = ({
    navigation,
    route,
}) => {
    const [settingsShow, setSettingsShow] = useState(false)
    const [idinvChanging, setIdinvChanging] = useState(false)
    const [presses, setPresses] = useState(0)
    const user = useUser()
    const tokens = useAuth()
    const settings = useSettings()

    const setIdinv = (idinv: string) => {
        setIdinvChanging(true)
        userUpdateIdinv(user._id, tokens.access_token, idinv)
            .then(res => {
                Alert.alert(strings.Success, strings.IdinvChangeSuccess)
                Get(`users/${user._id}`, tokens.access_token)
                    .then(res => {
                        // dispatch(updateUser(res))
                    })
                    .catch(err => {
                        // dispatch(userFetchFailed())
                    }),
                    // setIdinvFilter(true)
                    setIdinvChanging(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const checkIncomingQR = () => {
        if (idinvChanging) return
        if (route.params?.qrValue) {
            const qrValue = route.params.qrValue

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
    }, [route.params?.qrValue])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: strings.Settings,
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableIcon
                        set="FontAwesome"
                        name="qrcode"
                        color="#000"
                        size={25}
                        style={{ margin: 15 }}
                        onPress={() => {
                            navigation.navigate(Routes.QRScan, {
                                returnTo: Routes.Settings,
                                sender: ActivityTypes.Sleep, // not needed here
                            })
                        }}
                    />
                    <TouchableIcon
                        set="FontAwesome"
                        name="heart"
                        color="#000"
                        size={25}
                        style={{ margin: 15 }}
                        onPress={() => {
                            navigation.navigate(Routes.AppStatus)
                        }}
                    />
                </View>
            ),
        })
    }, [navigation])

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
                        navigation.navigate(Routes.Debug)
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
                        title={strings.IdinvFilter}
                        value={settings.idinvFilter}
                        onChange={() => settings.toggleIdinvFilter()}
                    />
                    <ToggleSwitch
                        title={strings.Notifications}
                        value={settings.notifications}
                        onChange={() => settings.toggleNotifications()}
                    />
                    <NumInput
                        title={strings.PostponeNotificationsBy}
                        value={settings.notificationDelay}
                        onChange={value => settings.setNotificationDelay(value)}
                    />
                </View>
            ) : (
                <IdinvBlock idinv={user.idinv} />
            )}
            <View style={styles.buttonView}>
                <View>
                    <Button
                        title={strings.EditProfile}
                        onPress={() => {
                            Linking.openURL(profileEditUrl).catch(err =>
                                console.log('An error occurred', err),
                            )
                        }}
                    />
                </View>
                <View>
                    <Button
                        title={strings.Logout}
                        onPress={() => {
                            tokens.logout()
                        }}
                    />
                </View>
            </View>
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
