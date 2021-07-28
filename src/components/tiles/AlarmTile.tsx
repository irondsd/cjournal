import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import { ActivityTypes, Routes } from '../../constants'
import { useInitActivity } from '../../hooks/useInitActivity'
import { useNavigation } from '@react-navigation/native'

const name = ActivityTypes.Alarm

export const AlarmTile: FC<TileChildProps> = () => {
    const { initWithLocationSave } = useInitActivity()
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
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
