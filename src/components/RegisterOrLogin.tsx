import React, { FC } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Routes } from '../constants'
import { strings } from '../localization'
import Icon from 'react-native-vector-icons/FontAwesome'
import Incart from '../resources/svg/incart.svg'
import { useAuth } from '../context/authContext'

type RegisterOrLoginProps = {
    navigation: any
}

export const RegisterOrLogin: FC<RegisterOrLoginProps> = ({ navigation }) => {
    const { authorize } = useAuth()

    const register = () => navigation.navigate(Routes.Register)

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
            <TouchableOpacity style={styles.button} onPress={authorize}>
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
