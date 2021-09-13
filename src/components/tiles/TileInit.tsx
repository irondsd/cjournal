import React, { FC } from 'react'
import { Tile, TileTypeChildProps } from './Tile'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { ActivityRouter } from '../../navigation/ActivityRouter'
import { useInitActivity } from '../../hooks/useInitActivity'

export const TileInit: FC<TileTypeChildProps> = ({ name }) => {
    const navigation = useNavigation()
    const { initSave } = useInitActivity()

    const route = ActivityRouter(name)
    const options = { sender: name }

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                initSave(name)
                navigation.navigate(Routes.Home)
            }}
            onLongPress={() => {
                navigation.navigate(route, options)
            }}
        />
    )
}
