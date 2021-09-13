import React, { useEffect } from 'react'
import { strings } from '../../localization'
import { TileOpenSender } from '../../components/tiles'
import { TileLine } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'
import { View } from 'react-native'

export const TakingMedicineScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.TakingMedicine
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileOpenSender name={ActivityTypes.CourseTherapy} />
                <TileOpenSender name={ActivityTypes.ReliefOfAttack} />
                <TileOpenSender name={ActivityTypes.MedicineTest} />
            </TileLine>
        </View>
    )
}

TakingMedicineScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
