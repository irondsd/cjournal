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
import { TileLine } from '../../components/TileLine'
import { defaultStyles } from '../../constants'

export const ComplaintsScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Complaints
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <ArrhythmiaTile />
                <PalpitationTile />
                <DyspneaTile />
            </TileLine>
            <TileLine>
                <TachypneaTile />
                <VisionDisturbancesTile />
                <OtherComplaintsTile />
            </TileLine>
        </View>
    )
}

ComplaintsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
