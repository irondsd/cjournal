import React, { FC, useEffect } from 'react'
import BackgroundFetch from 'react-native-background-fetch'
// import sync from './src/services/sync'
import { NavContainer } from './src/navigation/NavContainer'
import { idinvWatcher } from './src/services/idinvWatcher'
import { setupNotifications } from './src/notifications/notifications'
import { AuthProvider } from './src/context/authContext'
import { UserProvider } from './src/context/userContext'
import { ActivitiesProvider } from './src/context/activitiesContext'
import { TasksProvider } from './src/context/tasksContext'
import { SettingsProvider } from './src/context/settingsContext'

const App: FC = () => {
    // const user = useSelector((state: RootState) => state.user)
    // const tokens = useSelector((state: RootState) => state.tokens)

    useEffect(() => {
        setupNotifications()
        BackgroundFetch.configure(
            {
                minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
                stopOnTerminate: false, // <-- Android-only,
                startOnBoot: true, // <-- Android-only
            },
            () => {
                // if (user._id && tokens) {
                //     sync(user._id, tokens)
                //     if (user._id && tokens.access_token && user.idinv)
                //         idinvWatcher(user._id, tokens.access_token, user.idinv)
                // } else {
                //     console.log(`Sync aborted, not logged in`)
                // }

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
    }, [])

    return (
        <AuthProvider>
            <UserProvider>
                <SettingsProvider>
                    <ActivitiesProvider>
                        <TasksProvider>
                            <NavContainer
                            // ref={navigatorRef => {
                            //     NavigationService.setTopLevelNavigator(navigatorRef)
                            // }}
                            />
                        </TasksProvider>
                    </ActivitiesProvider>
                </SettingsProvider>
            </UserProvider>
        </AuthProvider>
    )
}

export default App
