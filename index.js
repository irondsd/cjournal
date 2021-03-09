import { AppRegistry, YellowBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { RootSiblingParent } from 'react-native-root-siblings'

export default class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootSiblingParent>
                    <App />
                </RootSiblingParent>
            </Provider>
        )
    }
}

YellowBox.ignoreWarnings(['Require cycle:', 'ListView is deprecated'])

AppRegistry.registerComponent(appName, () => AppContainer)
