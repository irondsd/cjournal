import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CuffFixTile,
    ElectrodeReplacementTile,
    VerticalPositionCalibrationTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'

export const ServiceScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Service
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <TileLine>
            <CuffFixTile navigation={navigation} />
            <ElectrodeReplacementTile navigation={navigation} />
            <VerticalPositionCalibrationTile navigation={navigation} />
        </TileLine>
    )
}

ServiceScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
