import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomeScreen from '../screens/WelcomeScreen'

export const Auth = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
    },
    {
        initialRouteName: 'Welcome',
    },
)
