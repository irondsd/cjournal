import React, { useLayoutEffect } from 'react'
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarOptions,
} from '@react-navigation/material-top-tabs'
import { strings } from '../localization'
import { Routes } from './Routes'
import { TabbarIcon } from './TabbarIcon'
import {
    appColor,
    backgroundColor,
    secondaryGrey,
    tintColor,
} from '../constants'
import { HomeScreen } from '../screens/Tabs/HomeScreen'
import { JournalScreen } from '../screens/Tabs/JournalScreen'
import { TasksScreen } from '../screens/Tabs/TasksScreen'
import { SettingsButton } from '../components/SettingsButton'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { ActivityScreen } from '../screens/Navigation/ActivityScreen'
import { PhysicalLoadScreen } from '../screens/Navigation/PhysicalLoadScreen'
import { ServiceScreen } from '../screens/Navigation/ServiceScreen'
import { TakingMedicineScreen } from '../screens/Navigation/TakingMedicineScreen'
import { TestsScreen } from '../screens/Navigation/TestsScreen'
import { PainScreen } from '../screens/Navigation/PainScreen'
import { WeaknessScreen } from '../screens/Navigation/WeaknessScreen'
import { ComplaintsScreen } from '../screens/Navigation/ComplaintsScreen'
import { EmotionalStressScreen } from '../screens/Navigation/EmotionalStressScreen'

const Tab = createMaterialTopTabNavigator()

const TAB_BAR_OPTIONS: MaterialTopTabBarOptions = {
    style: {
        height: 60,
        backgroundColor: backgroundColor,
    },

    indicatorStyle: { backgroundColor: tintColor },
    activeTintColor: appColor,
    inactiveTintColor: secondaryGrey,
    showIcon: true,
    labelStyle: {
        top: -5,
        fontSize: 13,
        textTransform: 'none',
    },
    tabStyle: {
        paddingBottom: 10,
    },
}

export const HomeStack = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        navigation.setOptions({
            headerTitle: strings[routeName],
            headerRight: () => {
                if (routeName !== 'Home') return null
                return (
                    <SettingsButton
                        onPress={() => {
                            navigation.navigate(Routes.Settings)
                        }}
                    />
                )
            },
        })
    }, [navigation, route])

    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName={Routes.Home}
            swipeEnabled={true}
            tabBarOptions={TAB_BAR_OPTIONS}>
            <Tab.Screen
                name="Journal"
                component={JournalScreen}
                options={{
                    title: strings.Journal,
                    tabBarIcon: ({ color }) => {
                        return TabbarIcon(`ios-journal`, color)
                    },
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: strings.Home,
                    tabBarIcon: ({ color }) => {
                        return TabbarIcon(`ios-home`, color)
                    },
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    title: strings.Tasks,
                    tabBarIcon: ({ color }) => {
                        return TabbarIcon(`ios-list-box`, color)
                    },
                }}
            />
        </Tab.Navigator>
    )
}
