import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { useInitActivity } from '../../hooks/useInitActivity'

const name = ActivityTypes.Workout

export const WorkoutTile: FC<TileChildProps> = () => {
    const { initSave } = useInitActivity()
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                initSave(name)
                navigation.navigate(Routes.Home)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.TimePick, {
                    sender: name,
                })
            }}
        />
    )
}
