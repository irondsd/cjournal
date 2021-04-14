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
import { TileLine }  from '../../components/TileLine'
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
            <TileLine>
                <ArrhythmiaTile navigation={navigation} />
                <PalpitationTile navigation={navigation} />
                <DyspneaTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <TachypneaTile navigation={navigation} />
                <VisionDisturbancesTile navigation={navigation} />
                <OtherComplaintsTile navigation={navigation} />
            </TileLine>
        </View>
    )
}
