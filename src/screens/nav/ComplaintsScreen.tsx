import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import {
    DyspneaTile,
    TachypneaTile,
    ArrhythmiaTile,
    PalpitationTile,
    OtherComplaintsTile,
    VisionDisturbancesTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const ComplaintsScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.Complaints
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <ArrhythmiaTile navigation={navigation} />
                <PalpitationTile navigation={navigation} />
                <DyspneaTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <TachypneaTile navigation={navigation} />
                <VisionDisturbancesTile navigation={navigation} />
                <OtherComplaintsTile navigation={navigation} />
            </TileWrapper>
        </View>
    )
}
