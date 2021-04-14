import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Auth } from './Auth'
import { MainTabs } from './MainTabs'
import { SplashScreen } from '../screens/SplashScreen'

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: SplashScreen,
            App: MainTabs,
            Auth: Auth,
        },
        {
            initialRouteName: 'Loading',
        },
    ),
)
