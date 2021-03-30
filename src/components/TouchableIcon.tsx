import React, { FC } from 'react'
import { TextStyle } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface TouchableIcon {
    onPress: () => void
    style?: TextStyle
    color?: string
    size?: number
    name: string
}

export const TouchableIcon: FC<TouchableIcon> = ({
    onPress,
    style,
    color = '#ffffff',
    size = 30,
    name,
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Icon name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}
