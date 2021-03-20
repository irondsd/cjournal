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

const name = activityTypes.Alarm

export const AlarmTile: FC<TileChildProps> = ({ navigation }) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            color="#b51515"
            shadeColor="#b51515"
            onPress={() => {
                Activity.instantInitWithLocationSave(name)
            }}
            onLongPress={() => {
                navigation.navigate(paths.Alarm, {
                    longPress: true,
                })
            }}
        />
    )
}
