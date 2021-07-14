import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = ActivityTypes.Service

export const ServiceTile: FC<TileChildProps> = ({ navigation, disabled }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            disabled={disabled}
            onPress={() => {
                navigation.navigate(paths.Service)
            }}
            onLongPress={() => {
                navigation.navigate(paths.Service)
            }}
        />
    )
}
