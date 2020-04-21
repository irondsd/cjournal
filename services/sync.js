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

let errors = 0

export default async function sync(id, tokens) {
    let activities = store.getState().activity
    tokens = store.getState().tokens

    if (!tokens || !id) return console.log('no tokens, sync aborted')

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
                        `Tokens expored, errors: ${errors}, logging out`,
                    )
                    store.dispatch(logoutUser())
                    NavigationService.navigate(paths.Welcome)
                }
            })
    }

    if (!tokens.access_token) return // console.log('no tokens, sync aborted')
    syncActivities(activities, id, tokens.access_token)
        .then(() => {
            store.dispatch(userFetchData(id, tokens.access_token))
            store.dispatch(activityFetchData(id, tokens.access_token))
            store.dispatch(tasksFetchData(id, tokens.access_token))
            store.dispatch(identityUserInfo(tokens.access_token))

            console.log('sync done')
        })
        .catch(err => {
            console.log('sync ended with errors', err)
        })
}
