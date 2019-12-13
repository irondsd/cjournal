import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { withNavigation } from 'react-navigation'
// TODO: icons ios fix. android works
class QRScanButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    this.props.callback()
                }}>
                <Icon name="qrcode" color="#FFF" size={30} />
            </TouchableOpacity>
        )
    }
}

export default withNavigation(QRScanButton)

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
