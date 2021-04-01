import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface BackButtonProps {
    onPress: () => void
}

export const BackButton: FC<BackButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.menuIcon} onPress={() => onPress()}>
            <Icon name="md-arrow-back" color="#000" size={25} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuIcon: {
        left: 7,
        height: 35,
        width: 35,
        padding: 5,
        alignItems: 'flex-end',
    },
})
