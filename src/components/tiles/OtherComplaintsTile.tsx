import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    ActivityTypes,
    Routes,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = ActivityTypes.OtherComplaints

export const OtherComplaintsTile: FC<TileChildProps> = ({
    navigation,
    disabled,
}) => {
    return (
        <Tile
            text={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(Routes.Other, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Other, {
                    sender: name,
                })
            }}
        />
    )
}
