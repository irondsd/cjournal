import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'

class DeleteButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    this.props.callback ? this.props.callback() : null
                }}
            >
                <Icon name='md-trash' color='#000' size={25} />
            </TouchableOpacity>
        )
    }
}

export default withNavigation(DeleteButton)

const styles = StyleSheet.create({
    menuIcon: {
        right: 15,
        height: 35,
        width: 35,
        padding: 5,
        alignItems: 'flex-end'
    }
})
