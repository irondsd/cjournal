import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'
import Activity from '../../classes/Activity'

const name = activityTypes.Bicycling

export const BicyclingTile: FC<TileChildProps> = ({ navigation }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                Activity.instantInitSave(name, navigation.navigate)
            }}
            onLongPress={() => {
                navigation.navigate(paths.TimePick, {
                    sender: name,
                })
            }}
        />
    )
}
