import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = activityTypes.ActiveOrthostasis

export const ActiveOrthostasisTile: FC<TileChildProps> = ({ navigation }) => {
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
