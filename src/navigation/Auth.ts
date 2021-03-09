import { createStackNavigator } from 'react-navigation-stack'
import WelcomeScreen from '../screens/WelcomeScreen'
import RegisterScreen from '../screens/RegisterScreen'

export const Auth = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions: () => ({
                header: null,
            }),
        },
    },
    {
        initialRouteName: 'Welcome',
    },
)
