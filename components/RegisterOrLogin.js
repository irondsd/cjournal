import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { apiUrl, appColor, registrationUrl } from '../properties'
import { strings } from '../localizations'
import { withNavigation } from 'react-navigation'

class RegisterOrLogin extends Component {
    render() {
        return (
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking.openURL(registrationUrl).catch(err =>
                            console.error('An error occurred', err),
                        )
                    }}>
                    <Text style={styles.buttonText}>{strings.Register}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('Login')
                    }}>
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
        shadowOffset: { height: 5 },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: '#00000004',
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
        // backgroundColor: appColor,
    },
})
