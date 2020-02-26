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
import { apiUrl, appColor } from '../constants'
import { strings } from '../localizations'
import { identityLogin } from '../requests/identityLogin'
import { connect } from 'react-redux'
import TouchableIcon from './TouchableIcon'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    login() {
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        return (
            <View style={styles.box}>
                <StatusBar barStyle="light-content" />
                <View style={styles.inputBox}>
                    <View style={styles.iconBox}>
                        <TouchableIcon name="user" size={25} />
                    </View>
                    <TextInput
                        placeholder={strings.username}
                        placeholderTextColor="#dddddd"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType={'default'}
                        onChangeText={text => {
                            this.setState({
                                username: text,
                            })
                        }}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.iconBox}>
                        <TouchableIcon name="lock" size={25} />
                    </View>
                    <TextInput
                        placeholder={strings.password}
                        placeholderTextColor="#dddddd"
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
                </View>

                <View style={[styles.inputBox, styles.buttonsBox]}>
                    <View style={[styles.iconBox, styles.buttonQrBox]}></View>
                    <TouchableOpacity
                        style={[styles.inputBox, styles.buttonBox]}
                        onPress={() => {
                            this.login()
                        }}>
                        <Text style={styles.buttonText}>{strings.Login}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(identityLogin(username, password))
    },
})

export default connect(null, mapDispatchToProps)(LoginForm)

const width = Dimensions.get('window').width * 0.7

const styles = StyleSheet.create({
    input: {
        margin: 5,
        padding: 5,
        height: 50,
        width: width,
        paddingLeft: 50,
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
        width: '100%',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        backgroundColor: '#00000015',
        height: 45,
        borderRadius: 10,
        width: 300,
        justifyContent: 'center',
        margin: 5,
    },
    buttonBox: {
        backgroundColor: '#ffffff00',
        margin: 0,
        marginLeft: 50,
        width: '83%',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffffff99',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        paddingLeft: 60,
    },
    iconBox: {
        backgroundColor: '#00000010',
        borderRadius: 10,
        width: 45,
        height: 45,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonQrBox: {
        backgroundColor: '#ffffff00',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffffff99',
    },
    buttonsBox: {
        backgroundColor: '#ffffff00',
    },
})
