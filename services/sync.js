import { activityFetchData } from '../requests/activityFetchData'
import { userFetchData } from '../requests/userFetchData'
import { tasksFetchData } from '../requests/tasksFetchData'
import { identityUserInfo } from '../requests/identityUserInfo'
import store from '../redux/store'
import syncActivities from './syncActivities'
import Barometer from '../sensors/Barometer'
import timestamp from '../helpers/timestamp'
import NavigationService from '../navigation/NavigationService'
import { logoutUser } from '../redux/actions'
import { paths } from '../constants'
import { isConnected } from './connectivityWatcher'
import { activityFetchIdinv } from '../requests/activityFetchIdinv'
import { tasksFetchIdinv } from '../requests/tasksFetchIdinv'

let errors = 0
let executing = false

export default async function sync(id, tokens) {
    if (!tokens || !id) return console.log('no tokens, sync aborted')

    if (executing) return console.log('sync already running')

    let activities = store.getState().activity
    tokens = store.getState().tokens

    executing = true

    if (tokens.expiresSoon()) {
        // console.log('going to update tokens', tokens.refresh_token)
        tokens
            .update()
            .then(tokens => {
                console.log('received new tokens', tokens.refresh_token)
                errors = 0
            })
            .catch(error => {
                if (error != 'already updating') {
                    console.log(error)
                }
                isConnected().then(connected => {
                    if (error.message == 'invalid_grant') {
                        errors += 1
                        console.log(`Error updating token ${errors} out of 5`)
                    }
                })
                if (errors >= 5 && tokens.isExpired()) {
                    console.log(
                        `Tokens expired, errors: ${errors}, logging out`,
                    )
                    store.dispatch(logoutUser())
                    NavigationService.navigate(paths.Welcome)
                }
            })
    }

    if (!tokens.access_token) return (executing = false)
    syncActivities(activities, id, tokens.access_token)
        .then(() => {
            if (store.getState().settings.idinvFilter) {
                let idinv = store.getState().user.idinv
                store.dispatch(activityFetchIdinv(idinv, tokens.access_token))
                store.dispatch(tasksFetchIdinv(idinv, tokens.access_token))
            } else {
                store.dispatch(activityFetchData(id, tokens.access_token))
                store.dispatch(tasksFetchData(id, tokens.access_token))
            }

            store.dispatch(userFetchData(id, tokens.access_token))
            store.dispatch(identityUserInfo(tokens.access_token))

            executing = false
            console.log('sync done')
        })
        .catch(err => {
            executing = false
            console.log('sync ended with errors', err)
        })
}
