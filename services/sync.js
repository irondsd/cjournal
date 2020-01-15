import { activityFetchData } from '../requests/activityFetchData'
import { userFetchData } from '../requests/userFetchData'
import { tasksFetchData } from '../requests/tasksFetchData'
import { identityUserInfo } from '../requests/identityUserInfo'
import { identityRefreshToken } from '../requests/identityRefreshToken'
import store from '../redux/store'
import syncActivities from './syncActivities'
import Barometer from '../sensors/Barometer'
import timestamp from '../helpers/timestamp'

export default async function sync(id, tokens) {
    // Barometer.calibrate(20)

    let activities = store.getState().activity

    if (tokens.expiresSoon()) {
        // update tokens first
        console.log('token expires soon, updating')
        tokens = await tokens.refresh()
        console.log('received new tokens')
    }

    if (!tokens || !tokens.access_token) {
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
