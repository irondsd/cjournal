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

const name = ActivityTypes.Tests

export const TestsTile: FC<TileChildProps> = ({ disabled }) => {
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            disabled={disabled}
            onPress={() => {
                navigation.navigate(Routes.Tests)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Tests)
            }}
        />
    )
}
