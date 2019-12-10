import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import { Auth } from './Auth'
// import { MainTabs } from './MainTabs'
import SplashScreen from '../screens/SplashScreen'
import HomeScreen from '../screens/HomeScreen'

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: SplashScreen,
      App: HomeScreen,
      // Auth: Auth,
    },
    {
      initialRouteName: 'SplashScreen',
    },
  ),
)
