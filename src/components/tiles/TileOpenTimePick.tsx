import React, { FC } from 'react'
import { Tile, TileTypeChildProps } from './Tile'
import { strings } from '../../localization'
import { Routes, tileColor, tileShadeColor } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { ActivityRouter } from '../../navigation/ActivityRouter'

export const TileOpenTimePick: FC<TileTypeChildProps> = ({ name }) => {
    const navigation = useNavigation()

    const route = ActivityRouter(name)
    const options = { sender: name }

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(route, options)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.TimePick, options)
            }}
        />
    )
}
