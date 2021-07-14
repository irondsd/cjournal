import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = ActivityTypes.PhysicalLoad

export const PhysicalLoadTile: FC<TileChildProps> = ({
    navigation,
    disabled,
}) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            disabled={disabled}
            onPress={() => {
                navigation.navigate(Routes.PhysicalLoad)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.PhysicalLoad)
            }}
        />
    )
}
