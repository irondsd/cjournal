import React, { FC } from 'react'
import { Tile, TileTypeChildProps } from './Tile'
import { strings } from '../../localization'
import { tileColor, tileShadeColor } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { ActivityRouter } from '../../navigation/ActivityRouter'

export const TileOpen: FC<TileTypeChildProps> = ({ name }) => {
    const navigation = useNavigation()

    const route = ActivityRouter(name)

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(route)
            }}
            onLongPress={() => {
                navigation.navigate(route)
            }}
        />
    )
}
