import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'
import { useNavigation } from '@react-navigation/native'

const name = ActivityTypes.Weakness

export const WeaknessTile: FC<TileChildProps> = ({ disabled }) => {
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(Routes.Weakness)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Weakness)
            }}
        />
    )
}
