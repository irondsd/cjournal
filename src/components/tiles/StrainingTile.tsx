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

const name = ActivityTypes.Straining

export const StrainingTile: FC<TileChildProps> = ({ navigation, disabled }) => {
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
                navigation.navigate(Routes.TimePick, {
                    sender: name,
                })
            }}
        />
    )
}
