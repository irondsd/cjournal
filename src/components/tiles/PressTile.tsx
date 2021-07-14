import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = ActivityTypes.Press

export const PressTile: FC<TileChildProps> = ({ navigation, disabled }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(paths.BloodPressure, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(paths.BloodPressure, {
                    sender: name,
                })
            }}
        />
    )
}
