import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'
import Activity from '../../classes/Activity'
import { useInitActivity } from '../../hooks/useInitActivity'

const name = ActivityTypes.Alarm

export const AlarmTile: FC<TileChildProps> = ({ navigation }) => {
    const { initWithLocationSave } = useInitActivity()

    return (
        <Tile
            text={strings[name]}
            iconName={name}
            color="#b51515"
            shadeColor="#b51515"
            onPress={() => {
                initWithLocationSave(name)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Alarm, {
                    longPress: true,
                })
            }}
        />
    )
}
