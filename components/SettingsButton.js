import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
import { paths } from '../properties'

class SettingsButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    this.props.navigation.navigate(paths.Settings)
                }}>
                <Icon name="md-settings" color="#000" size={25} />
            </TouchableOpacity>
        )
    }
}

export default withNavigation(SettingsButton)

const styles = StyleSheet.create({
    menuIcon: {
        right: 15,
        height: 35,
        width: 35,
        padding: 5,
        alignItems: 'flex-end',
    },
})
