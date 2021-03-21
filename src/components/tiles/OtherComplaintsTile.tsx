import React, { FC } from 'react'
import { Tile, TileChildProps } from '../TileTS'
import { strings } from '../../localization'
import {
    activityTypes,
    paths,
    tileColor,
    tileShadeColor,
} from '../../constants'

const name = activityTypes.OtherComplaints

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
                navigation.navigate(paths.Other, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(paths.Other, {
                    sender: name,
                })
            }}
        />
    )
}
