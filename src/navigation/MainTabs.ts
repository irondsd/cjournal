import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import {
    backgroundColor,
    Routes,
    appColor,
    secondaryGrey,
    tintColor,
} from '../constants'
import { strings } from '../localization'
import { JournalScreen } from '../screens/JournalScreen'
import { TasksScreen } from '../screens/TasksScreen'
import { HomeScreen } from '../screens/HomeScreen'
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { TimePickScreen } from '../screens/Activity/TimePickScreen'
import { ActivityScreen } from '../screens/nav/ActivityScreen'
import { PhysicalLoadScreen } from '../screens/nav/PhysicalLoadScreen'
import { ServiceScreen } from '../screens/nav/ServiceScreen'
import { WalkingTestScreen } from '../screens/Activity/WalkingTestScreen'
import { SleepScreen } from '../screens/Activity/SleepScreen'
import { ExerciseFinishScreen } from '../screens/Activity/ExerciseFinishScreen'
import { TakingMedicineScreen } from '../screens/nav/TakingMedicineScreen'
import { PainScreen } from '../screens/nav/PainScreen'
import { ComplaintsScreen } from '../screens/nav/ComplaintsScreen'
import StairsScreen from '../screens/Activity/StairsScreen'
import { EmotionalStressScreen } from '../screens/nav/EmotionalStressScreen'
import { SleepFinishScreen } from '../screens/Activity/SleepFinishScreen'
import { WeaknessScreen } from '../screens/nav/WeaknessScreen'
import { PillsScreen } from '../screens/Activity/PillsScreen'
import { TestsScreen } from '../screens/nav/TestsScreen'
import DebugScreen from '../screens/DebugScreen'
import AlarmScreen from '../screens/Activity/AlarmScreen'
import ActivityStatsScreen from '../screens/ActivityStatsScreen'
import { CameraScreen } from '../screens/CameraScreen'
import { OtherScreen } from '../screens/Activity/OtherScreen'
import { QRScanScreen } from '../screens/QRScanScreen'
import { TrainerScreen } from '../screens/Activity/TrainerScreen'
import { BloodPressureScreen } from '../screens/Activity/BloodPressureScreen'
import { TabbarIcon } from '../components/TabbarIcon'
import { noTabbarScreens } from './noTabbarScreens'

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
    WalkingTest: WalkingTestScreen,
    Sleep: SleepScreen,
    ExerciseFinish: ExerciseFinishScreen,
    SleepFinish: SleepFinishScreen,
    TakingMedicine: TakingMedicineScreen,
    Pain: PainScreen,
    Complaints: ComplaintsScreen,
    Stairs: StairsScreen,
    EmotionalStress: EmotionalStressScreen,
    Weakness: WeaknessScreen,
    Pills: PillsScreen,
    Tests: TestsScreen,
    Alarm: AlarmScreen,
    Camera: CameraScreen,
    Other: OtherScreen,
    Trainer: TrainerScreen,
    BloodPressure: BloodPressureScreen,
    VerticalPositionCalibration: OtherScreen,
    Debug: DebugScreen,
    QRScan: QRScanScreen,
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
        routeName === Routes.ActivityDetails ||
        routeName === Routes.JournalCamera ||
        routeName === Routes.ActivityStats
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
    let routeName: Routes
    for (let i = 0; i < routes.length; i++) {
        routeName = routes[i].routeName
        // getting the last route name
    }

    if (noTabbarScreens.includes(routeName)) {
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
        initialRouteName: Routes.Home,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === Routes.Home) {
                    iconName = `ios-home`
                } else if (routeName === Routes.Journal) {
                    iconName = `ios-journal`
                } else if (routeName === Routes.Tasks) {
                    iconName = `ios-list-box`
                }
                return TabbarIcon(iconName, 25, tintColor, { top: -2 })
            },
        }),
        tabBarOptions: {
            style: {
                height: 60,
                backgroundColor: backgroundColor,
            },
            upperCaseLabel: false,
            indicatorStyle: { backgroundColor: tintColor },
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
