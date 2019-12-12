import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'

class BackButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => {
                    this.props.goBack()
                }}
            >
                <Icon name='md-arrow-back' color='#000' size={25} />
            </TouchableOpacity>
        )
    }
}

export default withNavigation(BackButton)

const styles = StyleSheet.create({
    menuIcon: {
        left: 7,
        height: 35,
        width: 35,
        padding: 5,
        alignItems: 'flex-end'
    }
})
