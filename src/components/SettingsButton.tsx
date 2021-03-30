import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface SettingsButtonProps {
    onPress: () => void
}

export const SettingsButton: FC<SettingsButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.menuIcon} onPress={onPress}>
            <Icon name="md-settings" color="#000" size={25} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuIcon: {
        right: 15,
        height: 35,
        width: 35,
        padding: 5,
        alignItems: 'flex-end',
    },
})
