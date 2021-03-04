import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './navigation/NavContainer'
import BackgroundFetch from 'react-native-background-fetch'
import sync from './services/sync'
import NavigationService from './navigation/NavigationService'
import { idinvWatcher } from './services/idinvWatcher'
import { setupNotifications } from './notifications/notifications'

class App extends Component {
    componentDidMount() {
        setupNotifications()
        BackgroundFetch.configure(
            {
                minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
                stopOnTerminate: false, // <-- Android-only,
                startOnBoot: true, // <-- Android-only
            },
            () => {
                if (this.props.user._id && this.props.tokens) {
                    sync(this.props.user._id, this.props.tokens)
                    if (
                        this.props.user._id &&
                        this.props.tokens.access_token &&
                        this.props.user.idinv
                    )
                        idinvWatcher(
                            this.props.user._id,
                            this.props.tokens.access_token,
                            this.props.user.idinv,
                        )
                } else {
                    console.log(`Sync aborted, not logged in`)
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
                    // console.log('BackgroundFetch is enabled')
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
    const user = state.user
    const tokens = state.tokens
    return { isLoggedIn, user, tokens }
}

export default connect(mapStateToProps)(App)
