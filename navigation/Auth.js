import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomeScreen from '../screens/WelcomeScreen'
import RegisterScreen from '../screens/RegisterScreen'

export const Auth = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
    },
    {
        initialRouteName: 'Welcome',
    },
)
