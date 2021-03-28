import React, { FC } from 'react'
import { TextStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const TabbarIcon = (
    name: string,
    size: number,
    color: string,
    style: TextStyle,
) => {
    return <Icon name={name} size={size} color={color} style={style} />
}
