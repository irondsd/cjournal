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
                if (this.props.id && this.props.tokens) {
                    sync(this.props.id, this.props.tokens)
                    if (
                        this.props.id &&
                        this.props.tokens.access_token &&
                        this.props.idinv
                    )
                        idinvWatcher(
                            this.props.id,
                            this.props.tokens.access_token,
                            this.props.idinv,
                        )
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
    const tokens = state.tokens
    const idinv = state.user.idinv
    return { isLoggedIn, id, tokens, idinv }
}

export default connect(mapStateToProps)(App)
