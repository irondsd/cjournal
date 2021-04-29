import React, { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { paths } from '../constants'
import { strings } from '../localization'
import Tokens from '../classes/Tokens'
import Icon from 'react-native-vector-icons/FontAwesome'
import Incart from '../resources/svg/incart.svg'
import { NavigationParams } from 'react-navigation'

type RegisterOrLoginProps = {
    navigation: NavigationParams
}

export const RegisterOrLogin: FC<RegisterOrLoginProps> = ({ navigation }) => {
    const login = async () =>
        Tokens.receive()
            .then(res => navigation.navigate(paths.Home))
            .catch(err => {
                if (err.message?.includes('Network error'))
                    Alert.alert(strings.NoConn, strings.CantConnectIdentity)
            })

    const register = () => navigation.navigate(paths.Register)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={register}>
                <Icon
                    style={[styles.img, { padding: 5 }]}
                    name={'user-plus'}
                    color={'#FFF'}
                    size={21}
                />
                <Text style={styles.buttonText}>{strings.Register}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Incart
                    style={styles.img}
                    width={33}
                    height={33}
                    fill={'#fff'}
                />
                <Text style={styles.buttonText}>{strings.Login}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        bottom: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        flexDirection: 'column',
    },
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
        height: 45,
    },
    buttonText: {
        flex: 1,
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
    },
    img: { position: 'absolute', left: 10 },
})
