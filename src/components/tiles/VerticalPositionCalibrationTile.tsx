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

const name = ActivityTypes.VerticalPositionCalibration

export const VerticalPositionCalibrationTile: FC<TileChildProps> = () => {
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(Routes.Other, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Other, {
                    sender: name,
                })
            }}
        />
    )
}
