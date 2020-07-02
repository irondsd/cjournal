import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image,
    Alert,
} from 'react-native'
import { apiUrl, appColor, registrationUrl, paths } from '../constants'
import { strings } from '../localization'
import { withNavigation } from 'react-navigation'
import Tokens from '../classes/Tokens'
import Icon from 'react-native-vector-icons/FontAwesome'
import Incart from '../resources/svg/incart.svg'

class RegisterOrLogin extends Component {
    Login = async () => {
        Tokens.receive()
            // authorization()
            .then(res => {
                this.props.navigation.navigate(paths.Home)
            })
            .catch(err => {
                if (err.message.includes('Network error')) {
                    Alert.alert(strings.NoConn, strings.CantConnectIdentity)
                }
            })
    }

    render() {
        return (
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.props.register()
                    }}>
                    <Icon
                        style={styles.img}
                        name={'user-plus'}
                        color={'#FFF'}
                        size={22}
                    />
                    <Text style={styles.buttonText}>{strings.Register}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.Login()
                    }}>
                    <Incart
                        style={{
                            position: 'absolute',
                            left: 7,
                            top: 7,
                        }}
                        width={33}
                        height={33}
                        fill={'#fff'}
                    />
                    <Text style={styles.buttonText}>{strings.Login}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(RegisterOrLogin)

const styles = StyleSheet.create({
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
    box: {
        position: 'absolute',
        padding: 10,
        bottom: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        flexDirection: 'column',
    },
    img: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 13,
        top: 11,
    },
})
