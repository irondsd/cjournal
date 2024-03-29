import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { useUser } from '../context/userContext'
import {
    SplashScreen,
    RegisterScreen,
    WelcomeScreen,
    SettingsScreen,
    ActivityScreen,
    PhysicalLoadScreen,
    ServiceScreen,
    TakingMedicineScreen,
    TestsScreen,
    PainScreen,
    WeaknessScreen,
    ComplaintsScreen,
    EmotionalStressScreen,
    AlarmScreen,
    BloodPressureScreen,
    ExerciseFinishScreen,
    OtherScreen,
    PillsScreen,
    SleepScreen,
    SleepFinishScreen,
    WalkingTestScreen,
    StairsScreen,
    TimePickScreen,
    CameraScreen,
    DebugScreen,
    QRScanScreen,
} from '../screens'
import {
    activitiesAsyncGet,
    tasksAsyncGet,
    authAsyncGet,
    userAsyncGet,
    settingsAsyncGet,
} from '../services/asyncStorage'
import { ActivityTypes, Routes } from '../constants'
import { HomeStack } from './HomeStack'
import { useActivities } from '../context/activitiesContext'
import { useSettings } from '../context/settingsContext'
import { useTasks } from '../context/tasksContext'
import { AppStatusScreen } from '../screens/AppStatus'

export type RootStackParamList = {
    Home: undefined
    Register: undefined
    Debug: undefined
    Activity: undefined
    PhysicalLoad: undefined
    Service: undefined
    TakingMedicine: undefined
    Tests: undefined
    Pain: undefined
    Weakness: undefined
    Complaints: undefined
    EmotionalStress: undefined
    Alarm: undefined
    Sleep: { startedAt: number }
    Welcome: { message?: string }
    QRScan: { returnTo: keyof RootStackParamList; sender: ActivityTypes } //todo: see if returnTo is even necessary
    Camera: { returnTo: keyof RootStackParamList; sender: ActivityTypes }
    Settings: { qrValue?: string }
    ExerciseFinish: { activity: string }
    SleepFinish: { activity: string }
    TimePick: { sender: ActivityTypes; task?: string; id?: string }
    Other: { sender: ActivityTypes; task?: string; id?: string }
    Trainer: { sender: ActivityTypes; task?: string; id?: string }
    Pills: {
        sender: ActivityTypes
        task?: string
        image?: { uri: string }
        id?: string
    }
    BloodPressure: { sender: ActivityTypes; task?: string; id?: string }
    WalkingTest: undefined
    Stairs: undefined
    AppStatus: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

export const NavContainer: FC = () => {
    const { restore, loginError, isLoading, isLoggedIn } = useAuth()
    const { load } = useUser()
    const { activitiesRestore } = useActivities()
    const { tasksRestore } = useTasks()
    const { restoreSettings } = useSettings()

    useEffect(() => {
        const secureStoreLoad = async () => {
            try {
                const tokens = await authAsyncGet()
                const user = await userAsyncGet()

                if (tokens.access_token) restore(tokens)
                else return loginError()

                if (user._id) load(user)
                activitiesAsyncGet().then(res => {
                    if (res) activitiesRestore(res)
                })
                tasksAsyncGet().then(res => {
                    if (res) tasksRestore(res)
                })
                settingsAsyncGet().then(res => {
                    if (res) restoreSettings(res)
                })
            } catch (e) {
                loginError()
            }
        }

        secureStoreLoad()
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    const initialRoute = Routes.Home // todo last screen

    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={initialRoute}>
                {isLoggedIn ? (
                    <>
                        <RootStack.Screen
                            name={Routes.Home}
                            component={HomeStack}
                        />
                        <RootStack.Screen
                            name={Routes.Settings}
                            component={SettingsScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Activity}
                            component={ActivityScreen}
                        />
                        <RootStack.Screen
                            name={Routes.PhysicalLoad}
                            component={PhysicalLoadScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Service}
                            component={ServiceScreen}
                        />
                        <RootStack.Screen
                            name={Routes.TakingMedicine}
                            component={TakingMedicineScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Tests}
                            component={TestsScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Pain}
                            component={PainScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Weakness}
                            component={WeaknessScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Complaints}
                            component={ComplaintsScreen}
                        />
                        <RootStack.Screen
                            name={Routes.EmotionalStress}
                            component={EmotionalStressScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Alarm}
                            component={AlarmScreen}
                        />
                        <RootStack.Screen
                            name={Routes.BloodPressure}
                            component={BloodPressureScreen}
                        />
                        <RootStack.Screen
                            name={Routes.ExerciseFinish}
                            component={ExerciseFinishScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Pills}
                            component={PillsScreen}
                        />
                        <RootStack.Screen
                            name={Routes.TimePick}
                            component={TimePickScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Trainer}
                            component={OtherScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Other}
                            component={OtherScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Camera}
                            component={CameraScreen}
                        />
                        <RootStack.Screen
                            name={Routes.QRScan}
                            component={QRScanScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Sleep}
                            component={SleepScreen}
                        />
                        <RootStack.Screen
                            name={Routes.SleepFinish}
                            component={SleepFinishScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Debug}
                            component={DebugScreen}
                        />
                        <RootStack.Screen
                            name={Routes.WalkingTest}
                            component={WalkingTestScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Stairs}
                            component={StairsScreen}
                        />
                        <RootStack.Screen
                            name={Routes.AppStatus}
                            component={AppStatusScreen}
                        />
                    </>
                ) : (
                    <>
                        <RootStack.Screen
                            name="Welcome"
                            component={WelcomeScreen}
                        />
                        <RootStack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
