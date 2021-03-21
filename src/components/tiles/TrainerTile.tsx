import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = activityTypes.Trainer

export const TrainerTile: FC<TileChildProps> = ({ navigation, disabled }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(paths.Trainer)
            }}
            onLongPress={() => {
                navigation.navigate(paths.Trainer)
            }}
        />
    )
}
