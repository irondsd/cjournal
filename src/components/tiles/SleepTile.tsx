import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import { ActivityTypes, Routes } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const name = ActivityTypes.Sleep

export const SleepTile: FC<TileChildProps> = ({ disabled }) => {
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            color="#0642bc"
            shadeColor="#0642bc"
            disabled={disabled}
            onPress={() => {
                navigation.navigate(Routes.Sleep)
            }}
            onLongPress={() => {
                navigation.navigate(Routes.TimePick, {
                    sender: name,
                })
            }}
        />
    )
}
