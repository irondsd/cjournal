import { activityFetchData } from '../requests/activityFetchData'
import { userFetchData } from '../requests/userFetchData'
import { tasksFetchData } from '../requests/tasksFetchData'
import { identityUserInfo } from '../requests/identityUserInfo'
import { identityRefreshToken } from '../requests/identityRefreshToken'
import store from '../redux/store'
import syncActivities from './syncActivities'
import Barometer from '../sensors/Barometer'
import timestamp from '../helpers/timestamp'
import NavigationService from '../navigation/NavigationService'
import { logoutUser } from '../redux/actions'
import { paths } from '../constants'
import { isConnected } from './connectivityWatcher'

let errors = 0

// TODO: fix doubling opon sync

export default async function sync(id, tokens) {
    let activities = store.getState().activity

    if (!tokens || !id) return console.log('sync aborted')

    if (tokens.expiresSoon()) {
        // update tokens first

        try {
            tokens = await tokens.refresh()
        } catch (error) {
            isConnected().then(connected => {
                console.log('is connected', connected)
                if (!connected) errors += 1
            })

            if (errors >= 5 && tokens.isExpired()) {
                console.log(`Tokens expored, errors: ${errors}, logging out`)
                store.dispatch(logoutUser())
                NavigationService.navigate(paths.Welcome)
            }
            return
        }
        console.log('received new tokens', tokens.refresh_token)
        errors = 0
    }

    if (!tokens.access_token) {
        // probably log out here in this case
        return console.log('no tokens, sync aborted')
    }
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
