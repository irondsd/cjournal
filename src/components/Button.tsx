import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { secondaryColor, secondaryGrey, width } from '../constants'

interface ButtonProps {
    title: string
    disabled?: boolean
    onPress: () => void
}

export const Button: React.FC<ButtonProps> = ({
    title,
    disabled = false,
    onPress,
}) => {
    const color = disabled ? secondaryGrey : secondaryColor

    const pressed = () => {
        if (!disabled) {
            disabled = true
            onPress()
        }

        setInterval(() => {
            disabled = false
        }, 300)
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.container, { backgroundColor: color }]}
            disabled={disabled}
            onPress={pressed}>
            <Text style={styles.text}>{title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: width / 23,
        color: 'white',
        textAlign: 'center',
    },
})
