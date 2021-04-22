import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CourseTherapyTile,
    ReliefOfAttackTile,
    MedicineTestTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const TakingMedicineScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.TakingMedicine
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <TileLine>
            <CourseTherapyTile navigation={navigation} />
            <ReliefOfAttackTile navigation={navigation} />
            <MedicineTestTile navigation={navigation} />
        </TileLine>
    )
}

TakingMedicineScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
