import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation'
// TODO: icons ios fix. android works

class RegButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    this.props.callback()
                }}>
                {/* <Icon name="qr-code" color="#FFF" size={30} /> */}
                <Text style={{ color: 'white' }}>Register</Text>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(RegButton)

const styles = StyleSheet.create({
    menuIcon: {
        height: 35,
        width: 40,
        top: 97,
        padding: 5,
        margin: 5,
        position: 'absolute',
    },
})
