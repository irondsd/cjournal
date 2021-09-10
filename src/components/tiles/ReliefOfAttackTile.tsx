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

const name = ActivityTypes.ReliefOfAttack

export const ReliefOfAttackTile: FC<TileChildProps> = ({ disabled }) => {
    const navigation = useNavigation()

    return (
        <Tile
            title={strings[name]}
            iconName={name}
            shadeColor={tileColor}
            color={tileShadeColor}
            onPress={() => {
                navigation.navigate(Routes.Pills, {
                    sender: name,
                })
            }}
            onLongPress={() => {
                navigation.navigate(Routes.Pills, {
                    sender: name,
                })
            }}
        />
    )
}
