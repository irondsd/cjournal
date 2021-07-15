import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export const TabbarIcon = (name: string, color: string) => {
    const size = 20
    const style = { left: 2.5 }

    return <Icon name={name} size={size} color={color} style={style} />
}
