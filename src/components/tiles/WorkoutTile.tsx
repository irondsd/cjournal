import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import Activity from '../../classes/Activity'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = activityTypes.Workout

export const WorkoutTile: FC<TileChildProps> = ({ navigation, disabled }) => {
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
