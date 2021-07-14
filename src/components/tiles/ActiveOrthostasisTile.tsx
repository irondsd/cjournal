import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = ActivityTypes.ActiveOrthostasis

export const ActiveOrthostasisTile: FC<TileChildProps> = ({ navigation }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(Routes.BloodPressure, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(Routes.BloodPressure, {
                    sender: name,
                })
            }}
        />
    )
}
