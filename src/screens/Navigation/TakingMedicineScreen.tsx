import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CourseTherapyTile,
    ReliefOfAttackTile,
    MedicineTestTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { defaultStyles } from '../../constants'
import { View } from 'react-native'

export const TakingMedicineScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.TakingMedicine
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.tileScreen}>
            <TileLine>
                <CourseTherapyTile navigation={navigation} />
                <ReliefOfAttackTile navigation={navigation} />
                <MedicineTestTile navigation={navigation} />
            </TileLine>
        </View>
    )
}

TakingMedicineScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
