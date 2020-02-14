import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { backgroundColor, paths } from '../properties'
import { strings } from '../localizations'
import JournalScreen from '../screens/JournalScreen'
import TasksScreen from '../screens/TasksScreen'
import HomeScreen from '../screens/HomeScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TimePickScreen from '../screens/Activity/TimePickScreen'
import ActivityScreen from '../screens/nav/ActivityScreen'
import PhysicalActivityScreen from '../screens/nav/PhysicalActivityScreen'
import ServiceScreen from '../screens/nav/ServiceScreen'
import IntakeScreen from '../screens/nav/IntakeScreen'
import InfluenceScreen from '../screens/nav/InfluenceScreen'
import WalkingScreen from '../screens/Activity/WalkingScreen'
import RestScreen from '../screens/Activity/RestScreen'
import ExerciseFinishScreen from '../screens/Activity/ExerciseFinishScreen'
import TakingMedicineScreen from '../screens/nav/TakingMedicineScreen'
import ChestPainScreen from '../screens/nav/ChestPainScreen'
import CardiacRhythmDisturbanceScreen from '../screens/nav/CardiacRhythmDisturbanceScreen'
import DisturbanceOfRespirationScreen from '../screens/nav/DisturbanceOfRespirationScreen'
import StairsScreen from '../screens/Activity/StairsScreen'
import WorkoutScreen from '../screens/Activity/WorkoutScreen'
import EmotionsScreen from '../screens/nav/EmotionsScreen'
import WeaknessScreen from '../screens/nav/WeaknessScreen'
import PillsScreen from '../screens/Activity/PillsScreen'
import TestsScreen from '../screens/nav/TestsScreen'
import OrthostasisScreen from '../screens/Activity/OrthostasisScreen'
import AlarmScreen from '../screens/Activity/AlarmScreen'
import RunningScreen from '../screens/Activity/RunningScreen'
import WorkoutWalkingScreen from '../screens/Activity/WorkoutWalkingScreen'
import BicyclingScreen from '../screens/Activity/BicyclingScreen'
import ActivityStatsScreen from '../screens/ActivityStatsScreen'
import DeviceInstallScreen from '../screens/Activity/DeviceInstallScreen'
import CameraScreen from '../screens/CameraScreen'

const JournalStack = createStackNavigator({
    Journal: JournalScreen,
    ActivityDetails: ActivityDetailsScreen,
    ActivityStats: ActivityStatsScreen,
})

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Settings: SettingsScreen,
    TimePick: TimePickScreen,
    Activity: ActivityScreen,
    PhysicalActivity: PhysicalActivityScreen,
    Service: ServiceScreen,
    Intake: IntakeScreen,
    Influence: InfluenceScreen,
    Walking: WalkingScreen,
    Rest: RestScreen,
    ExerciseFinish: ExerciseFinishScreen,
    TakingMedicine: TakingMedicineScreen,
    ChestPain: ChestPainScreen,
    CardiacRhythmDisturbance: CardiacRhythmDisturbanceScreen,
    DisturbanceOfRespiration: DisturbanceOfRespirationScreen,
    Stairs: StairsScreen,
    Emotions: EmotionsScreen,
    Weakness: WeaknessScreen,
    Pills: PillsScreen,
    Tests: TestsScreen,
    Orthostasis: OrthostasisScreen,
    Running: RunningScreen,
    Bicycling: BicyclingScreen,
    Workout: WorkoutScreen,
    WorkoutWalking: WorkoutWalkingScreen,
    Alarm: AlarmScreen,
    DeviceInstall: DeviceInstallScreen,
    Camera: CameraScreen,
})

const TasksStack = createStackNavigator({
    Tasks: TasksScreen,
})

JournalStack.navigationOptions = { tabBarLabel: strings.Journal }
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
        routeName === paths.Rest ||
        routeName === paths.Walking ||
        routeName === paths.Stairs ||
        routeName === paths.ExerciseFinish ||
        routeName === paths.Camera
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
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
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
