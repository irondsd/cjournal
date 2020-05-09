import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import {
    backgroundColor,
    paths,
    appColor,
    secondaryColor,
    secondaryGrey,
} from '../constants'
import { strings } from '../localizations'
import JournalScreen from '../screens/JournalScreen'
import TasksScreen from '../screens/TasksScreen'
import HomeScreen from '../screens/HomeScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TimePickScreen from '../screens/Activity/TimePickScreen'
import ActivityScreen from '../screens/nav/ActivityScreen'
import PhysicalLoadScreen from '../screens/nav/PhysicalLoadScreen'
import ServiceScreen from '../screens/nav/ServiceScreen'
import WalkingScreen from '../screens/Activity/WalkingScreen'
import SleepScreen from '../screens/Activity/SleepScreen'
import ExerciseFinishScreen from '../screens/Activity/ExerciseFinishScreen'
import TakingMedicineScreen from '../screens/nav/TakingMedicineScreen'
import PainScreen from '../screens/nav/PainScreen'
import ComplaintsScreen from '../screens/nav/ComplaintsScreen'
import StairsScreen from '../screens/Activity/StairsScreen'
import EmotionalStressScreen from '../screens/nav/EmotionalStressScreen'
import WeaknessScreen from '../screens/nav/WeaknessScreen'
import PillsScreen from '../screens/Activity/PillsScreen'
import TestsScreen from '../screens/nav/TestsScreen'
import DebugScreen from '../screens/DebugScreen'
import AlarmScreen from '../screens/Activity/AlarmScreen'
import ActivityStatsScreen from '../screens/ActivityStatsScreen'
import DeviceInstallScreen from '../screens/Activity/DeviceInstallScreen'
import CameraScreen from '../screens/CameraScreen'
import OtherScreen from '../screens/Activity/OtherScreen'
import TrainerScreen from '../screens/Activity/TrainerScreen'
import BloodPressureScreen from '../screens/Activity/BloodPressureScreen'
import VerticalPositionCalibrationScreen from '../screens/Activity/VerticalPositionCalibrationScreen'

const JournalStack = createStackNavigator({
    Journal: JournalScreen,
    ActivityDetails: ActivityDetailsScreen,
    ActivityStats: ActivityStatsScreen,
    JournalCamera: CameraScreen,
})

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
    TimePick: TimePickScreen,
    Activity: ActivityScreen,
    PhysicalLoad: PhysicalLoadScreen,
    Service: ServiceScreen,
    Walking: WalkingScreen,
    Sleep: SleepScreen,
    ExerciseFinish: ExerciseFinishScreen,
    TakingMedicine: TakingMedicineScreen,
    Pain: PainScreen,
    Complaints: ComplaintsScreen,
    Stairs: StairsScreen,
    EmotionalStress: EmotionalStressScreen,
    Weakness: WeaknessScreen,
    Pills: PillsScreen,
    Tests: TestsScreen,
    Alarm: AlarmScreen,
    DeviceInstall: DeviceInstallScreen,
    Camera: CameraScreen,
    Other: OtherScreen,
    Trainer: TrainerScreen,
    BloodPressure: BloodPressureScreen,
    VerticalPositionCalibration: VerticalPositionCalibrationScreen,
})

const TasksStack = createStackNavigator({
    Tasks: TasksScreen,
})

JournalStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    let swipeEnabled = true
    let tabBarLabel = strings.Journal

    let routes
    if (navigation.state.routes) {
        routes = navigation.state.routes
    }

    let routeName = ''
    for (let i = 0; i < routes.length; i++) {
        routeName = routes[i].routeName
        // getting the last route name
    }

    if (
        routeName === paths.ActivityDetails ||
        routeName === paths.JournalCamera ||
        routeName === paths.ActivityStats
    ) {
        tabBarVisible = false
        swipeEnabled = false
    }

    return {
        tabBarVisible,
        tabBarLabel,
        swipeEnabled,
    }
}

HomeStack.navigationOptions = ({ navigation }) => {
    let routes
    if (navigation.state.routes) {
        routes = navigation.state.routes
    }
    let tabBarLabel = strings.Home
    let tabBarVisible = true
    let swipeEnabled = true
    // preventing tabbar from appearing on certain screens
    let routeName = ''
    for (let i = 0; i < routes.length; i++) {
        routeName = routes[i].routeName
        // getting the last route name
    }

    if (
        routeName === paths.Walking ||
        routeName === paths.Stairs ||
        routeName === paths.ExerciseFinish ||
        routeName === paths.Pills ||
        routeName === paths.BloodPressure ||
        routeName === paths.TimePick ||
        routeName === paths.Other ||
        routeName === paths.VerticalPositionCalibration ||
        routeName === paths.ExerciseFinish ||
        routeName === paths.Trainer ||
        routeName === paths.Alarm ||
        routeName === paths.Sleep
    ) {
        tabBarVisible = false
        swipeEnabled = false
    }

    return {
        tabBarVisible,
        tabBarLabel,
        swipeEnabled,
    }
}
TasksStack.navigationOptions = { tabBarLabel: strings.Tasks }

export const MainTabs = createMaterialTopTabNavigator(
    {
        Journal: JournalStack,
        Home: HomeStack,
        Tasks: TasksStack,
    },
    {
        initialRouteName: paths.Home,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === paths.Home) {
                    iconName = `ios-home`
                } else if (routeName === paths.Jounal) {
                    iconName = `ios-journal`
                } else if (routeName === paths.Tasks) {
                    iconName = `ios-list-box`
                }
                return (
                    <Icon
                        name={iconName}
                        size={25}
                        color={tintColor}
                        style={{ top: -2 }}
                    />
                )
            },
        }),
        tabBarOptions: {
            style: {
                height: 60,
                backgroundColor: backgroundColor,
            },
            upperCaseLabel: false,
            activeTintColor: appColor,
            inactiveTintColor: secondaryGrey,
            showIcon: true,
            labelStyle: {
                top: -5,
                fontSize: 13,
            },
            tabStyle: {
                paddingBottom: 10,
            },
        },
    },
)
