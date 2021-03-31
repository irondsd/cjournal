import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    StatusBar,
    TextInput,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import {
    appColor,
    identityUrl,
    paths,
    placeholderGrey,
    tileSize,
} from '../constants'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { strings } from '../localization'
import Toast from 'react-native-root-toast'
import { Registration } from '../requests/identityRequest'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const RegisterScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [repeatPassword, setRepeatPassword] = useState<string>()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const repeatPasswordRef = useRef(null)

    const showError = (message: string) => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    }

    const register = () => {
        const errors = runChecks()
        if (errors.length) {
            showError(errors.join('\n'))
        } else {
            Registration(email, password)
                .then(res => {
                    navigation.navigate(paths.Welcome, {
                        message: strings.RegisterSuccess,
                    })
                })
                .catch(err => {
                    showError(strings.ErrorEmailInUse)
                })
        }
    }

    const runChecks = (): string[] => {
        const errors: string[] = []

        if (!email || !password || !repeatPassword)
            errors.push(strings.ErrorFill)
        if (!/[0-9]/.test(password)) errors.push(strings.ErrorDigit)
        if (/^[a-z0-9]+$/i.test(password))
            errors.push(strings.ErrorAlphanumeric)
        if (password.length < 5) errors.push(strings.ErrorPassLen)
        if (password !== repeatPassword) errors.push(strings.ErrorPassNotEq)
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            errors.push(strings.ErrorEmail)
        if (!/[A-Z]/.test(password)) errors.push(strings.ErrorUppercase)

        return errors
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={appColor} barStyle="light-content" />
            <View>
                <View style={styles.inputContainer}>
                    <Icon
                        name={'at'}
                        color={'#fff'}
                        size={25}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder={strings.email}
                        placeholderTextColor={'#ffffff88'}
                        style={styles.input}
                        autoCapitalize="none"
                        ref={emailRef}
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordRef.current.focus()
                        }}
                        keyboardType={'default'}
                        onChangeText={value => {
                            setEmail(value)
                        }}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name={'lock'}
                        color={'#fff'}
                        size={25}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder={strings.password}
                        placeholderTextColor={'#ffffff88'}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        ref={passwordRef}
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                            repeatPasswordRef.current.focus()
                        }
                        keyboardType={'default'}
                        onChangeText={value => {
                            setPassword(value)
                        }}
                        value={password}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name={'lock'}
                        color={'#fff'}
                        size={25}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder={strings.repeatPassword}
                        placeholderTextColor={'#ffffff88'}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        ref={repeatPasswordRef}
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() => register()}
                        keyboardType={'default'}
                        onChangeText={value => {
                            setRepeatPassword(value)
                        }}
                        value={repeatPassword}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        register()
                    }}>
                    <Text style={styles.buttonText}>{strings.Register}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor,
        justifyContent: 'flex-end',
        padding: 30,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ffffff07',
    },
    input: { color: 'white', fontSize: 20 },
    button: {
        marginTop: 10,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffffff99',
        alignItems: 'center',
        backgroundColor: '#00000004',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
    icon: {
        width: 30,
        marginLeft: 20,
    },
})
