import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CuffFixTile,
    ElectrodeReplacementTile,
    VerticalPositionCalibrationTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const ServiceScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.Service
        navigation.setParams({
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
