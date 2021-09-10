import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'
import { useInitActivity } from '../../hooks/useInitActivity'
import { useNavigation } from '@react-navigation/native'

const name = ActivityTypes.PsychoemotionalTest

export const PsychoemotionalTestTile: FC<TileChildProps> = ({ disabled }) => {
    const navigation = useNavigation()
    const { initSave } = useInitActivity()

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
