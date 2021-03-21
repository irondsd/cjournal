import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CourseTherapyTile,
    ReliefOfAttackTile,
    MedicineTestTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
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
        <TileWrapper>
            <CourseTherapyTile navigation={navigation} />
            <ReliefOfAttackTile navigation={navigation} />
            <MedicineTestTile navigation={navigation} />
        </TileWrapper>
    )
}
