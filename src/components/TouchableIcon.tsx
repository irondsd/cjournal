import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { IconProps } from 'react-native-vector-icons/Icon'
import { Icon, Set } from './Icon'

interface TouchableIconProps extends Omit<IconProps, 'style'> {
    onPress: () => void
    set?: Set
    style?: ViewStyle
}

export const TouchableIcon: FC<TouchableIconProps> = ({
    name,
    set = 'FontAwesome5',
    onPress,
    style,
    color = '#ffffff',
    size = 30,
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Icon set={set} name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}
