import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileInit, TileOpenSender } from '../../components/tiles'
import { TileLine } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'

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
                <TileInit name={ActivityTypes.Arrhythmia} />
                <TileInit name={ActivityTypes.Palpitation} />
                <TileInit name={ActivityTypes.Dyspnea} />
            </TileLine>
            <TileLine>
                <TileInit name={ActivityTypes.Tachypnea} />
                <TileInit name={ActivityTypes.VisionDisturbances} />
                <TileOpenSender name={ActivityTypes.OtherComplaints} />
            </TileLine>
        </View>
    )
}

ComplaintsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
