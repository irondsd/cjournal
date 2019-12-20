import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './navigation/NavContainer'
import BackgroundFetch from 'react-native-background-fetch'
import sync from './services/sync'
import NavigationService from './navigation/NavigationService'

class App extends Component {
    componentDidMount() {
        BackgroundFetch.configure(
            {
                minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
                stopOnTerminate: false, // <-- Android-only,
                startOnBoot: true, // <-- Android-only
            },
            () => {
                if (this.props.id && this.props.api_key) {
                    sync(this.props.id, this.props.api_key)
                } else {
                    console.log(`Can't sync, not logged in`)
                }

                BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
            },
            error => {
                console.log('[js] RNBackgroundFetch failed to start')
            },
        )

        // Optional: Query the authorization status.
        BackgroundFetch.status(status => {
            switch (status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    console.log('BackgroundFetch restricted')
                    break
                case BackgroundFetch.STATUS_DENIED:
                    console.log('BackgroundFetch denied')
                    break
                case BackgroundFetch.STATUS_AVAILABLE:
                    console.log('BackgroundFetch is enabled')
                    break
            }
        })
    }

    render() {
        return (
            <NavContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }
}

function mapStateToProps(state) {
    const isLoggedIn = state.user.isLoggedIn
    const id = state.user.id
    const api_key = state.user.api_key
    return { isLoggedIn, id, api_key }
}

export default connect(mapStateToProps)(App)
