import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { APIBaseURL, appColor } from '../properties'
import { strings } from '../localizations'
import { withNavigation } from 'react-navigation'

// TODO: icons?
class RegisterOrLogin extends Component {
    render() {
        return (
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('Registration')
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
        width: 250,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        alignItems: 'center',
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
        backgroundColor: appColor,
    },
})
