import React, { Component } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { appColor, paths } from '../constants'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { strings } from '../localization'

export default class RegisterScreen extends Component {
    onNavigationStateChange = event => {
        if (event.navigationType === 'formsubmit') {
            if (event.url === 'http://identity.incart.ru:7050/') {
                this.props.navigation.navigate(paths.Welcome, {
                    message: strings.RegisterSuccess,
                })
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={appColor}
                    barStyle="light-content"
                    // hidden={true}
                />
                <WebView
                    source={{
                        uri:
                            'http://identity.incart.ru:7050/Identity/Account/Register/',
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 100,
        paddingBottom: 50,
        backgroundColor: appColor,
    },
})
