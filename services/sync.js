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
import { paths } from '../properties'

let errors = 0

export default async function sync(id, tokens) {
    // Barometer.calibrate(20)

    let activities = store.getState().activity

    if (!tokens && !id) return console.log('sync aborted')

    if (tokens.expiresSoon()) {
        // update tokens first
        console.log('token', tokens.refresh_token)
        try {
            tokens = await tokens.refresh()
        } catch (error) {
            errors += 1

            if (errors >= 5) {
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
