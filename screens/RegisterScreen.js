import React, { Component } from 'react'
import {
    StyleSheet,
    StatusBar,
    TextInput,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import { appColor, paths, tileSize } from '../constants'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { strings } from '../localization'
import Toast from 'react-native-root-toast'

export default class RegisterScreen extends Component {
    state = {
        email: '',
        password: '',
        repeatPassword: '',
    }

    onNavigationStateChange = event => {
        if (event.navigationType === 'formsubmit') {
            if (event.url === 'http://identity.incart.ru:7050/') {
                this.props.navigation.navigate(paths.Welcome, {
                    message: strings.RegisterSuccess,
                })
            }
        }
    }

    runCheck = () => {
        if (
            this.state.email ||
            this.state.password ||
            this.state.repeatPassword
        ) {
            if (
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    this.state.email,
                )
            ) {
                if (this.state.password === this.state.repeatPassword) {
                    if (this.state.password.length > 5) {
                        if (!/^[a-z0-9]+$/i.test(this.state.password)) {
                            if (/[0-9]/.test(this.state.password)) {
                                if (/[A-Z]/.test(this.state.password)) {
                                    console.log('Through')
                                } else {
                                    this.showError(strings.ErrorUppercase)
                                }
                            } else {
                                this.showError(strings.ErrorDigit)
                            }
                        } else {
                            this.showError(strings.ErrorAlphanumerical)
                        }
                    } else {
                        this.showError(strings.ErrorPassLen)
                    }
                } else {
                    this.showError(strings.ErrorPassNotEq)
                }
            } else {
                this.showError(strings.ErrorEmail)
            }
        } else {
            this.showError(strings.ErrorFill)
        }
    }

    showError(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            animation: true,
            hideOnPress: true,
            delay: 0,
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={appColor}
                    barStyle="light-content"
                    // hidden={true}
                />
                {/* <WebView
                    source={{
                        uri:
                            'http://identity.incart.ru:7050/Identity/Account/Register/',
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                /> */}
                <View>
                    <TextInput
                        placeholder={strings.email}
                        placeholderTextColor="#dddddd"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        ref="email"
                        returnKeyType="next"
                        onSubmitEditing={() => this.refs.password.focus()}
                        keyboardType={'default'}
                        onChangeText={text => {
                            this.setState({
                                email: text,
                            })
                        }}
                        value={this.state.username}
                    />
                    <TextInput
                        placeholder={strings.password}
                        placeholderTextColor="#dddddd"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        ref="password"
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() => this.refs.repeatPassword.focus()}
                        keyboardType={'default'}
                        onChangeText={text => {
                            this.setState({
                                password: text,
                            })
                        }}
                        value={this.state.password}
                    />
                    <TextInput
                        placeholder={strings.repeatPassword}
                        placeholderTextColor="#dddddd"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        ref="repeatPassword"
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType={'default'}
                        onChangeText={text => {
                            this.setState({
                                repeatPassword: text,
                            })
                        }}
                        value={this.state.repeatPassword}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.runCheck()
                        }}>
                        <Text style={styles.buttonText}>
                            {strings.Register}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: appColor,
        justifyContent: 'flex-end',
        padding: 30,
        paddingBottom: 30,
    },
    input: {
        marginTop: 5,
        padding: 10,
        height: 50,
        color: 'white',
        fontSize: 20,
        backgroundColor: '#ffffff05',
        borderRadius: 10,
        borderColor: '#ffffff44',
        borderWidth: 0.5,
    },
    button: {
        marginTop: 10,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffffff99',
        alignItems: 'center',
        // shadowOffset: { height: 5 },
        // shadowColor: '#000',
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
        backgroundColor: '#00000004',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
})
