import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = activityTypes.Sleep

export const SleepTile: FC<TileChildProps> = ({ navigation, disabled }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            color="#0642bc"
            shadeColor="#0642bc"
            disabled={disabled}
            onPress={() => {
                navigation.navigate(paths.Sleep)
            }}
            onLongPress={() => {
                navigation.navigate(paths.TimePick, {
                    sender: name,
                })
            }}
        />
    )
}
