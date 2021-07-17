import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC, useEffect } from 'react'
import { useAuth } from '../context/authContext'
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
    TrainerScreen,
    PillsScreen,
    WalkingTestScreen,
    TimePickScreen,
    CameraScreen,
} from '../screens'
import { tokensAsyncGet } from '../services/asyncStorage'
import { ActivityTypes, Routes } from '../constants'
import { HomeStack } from './HomeStack'

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
    Welcome: { message?: string }
    QRScan: { returnTo: Routes }
    Camera: { returnTo: Routes }
    Settings: { qrValue?: string }
    ExerciseFinish: { activity: string }
    SleepFinish: { activity: string }
    TimePick: { sender: ActivityTypes; task?: string }
    Other: { sender: ActivityTypes; task?: string }
    Trainer: { sender: ActivityTypes; task?: string }
    Pills: { sender: ActivityTypes; task?: string; image?: { uri: string } }
    BloodPressure: { sender: ActivityTypes; task?: string }
}

const RootStack = createStackNavigator<RootStackParamList>()

export const NavContainer: FC = () => {
    const { restore, logout, isLoading, isLoggedIn } = useAuth()

    useEffect(() => {
        const secureStoreLoad = async () => {
            try {
                const tokens = await tokensAsyncGet()
                if (tokens.access_token) restore(tokens)
            } catch (e) {
                logout()
            }
        }

        secureStoreLoad()
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator>
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
                            component={TrainerScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Other}
                            component={OtherScreen}
                        />
                        <RootStack.Screen
                            name={Routes.Camera}
                            component={CameraScreen}
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
