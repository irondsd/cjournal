import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    PositiveEmotionsTile,
    OtherEmotionsTile,
    NegativeEmotionsTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const EmotionalStressScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.EmotionalStress
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <TileWrapper>
            <PositiveEmotionsTile navigation={navigation} />
            <NegativeEmotionsTile navigation={navigation} />
            <OtherEmotionsTile navigation={navigation} />
        </TileWrapper>
    )
}
