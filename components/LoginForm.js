import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import { APIBaseURL, appColor } from '../properties'
import { strings } from '../localizations'
import { loginFetchData } from '../requests/loginFetchData'
import { connect } from 'react-redux'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    login() {
        this.props.login(this.state.email, this.state.password)
    }

    render() {
        return (
            <View style={styles.box}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    placeholder={strings.email}
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType={'email-address'}
                    onChangeText={text => {
                        this.setState({
                            email: text,
                        })
                    }}
                    value={this.state.email}
                />
                <TextInput
                    placeholder={strings.password}
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={styles.input}
                    secureTextEntry
                    returnKeyType="go"
                    ref={input => {
                        this.passwordInput = input
                    }}
                    onChangeText={text => {
                        this.setState({
                            password: text,
                        })
                    }}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.login()
                    }}>
                    <Text style={styles.buttonText}>{strings.Login}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => {
        dispatch(loginFetchData(email, password))
    },
})

export default connect(null, mapDispatchToProps)(LoginForm)

const width = Dimensions.get('window').width * 0.7

const styles = StyleSheet.create({
    input: {
        margin: 5,
        padding: 5,
        height: 40,
        width: width,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontSize: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        width: 200,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColor,
    },
})
