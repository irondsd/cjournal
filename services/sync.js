import { activityFetchData } from '../requests/activityFetchData'
import { userFetchData } from '../requests/userFetchData'
import { tasksFetchData } from '../requests/tasksFetchData'

import { dispatch } from 'redux'
import store from '../redux/store'
import syncActivities from './syncActivities'
// import { scheduleSync } from './connectivityWatcher'
import Barometer from '../sensors/Barometer'

export default async function sync(id, api_key) {
    if (!id) return
    // Barometer.calibrate(20)

    syncActivities()
        .then(() => {
            console.log('sync done')

            store.dispatch(userFetchData(id, api_key))
            store.dispatch(activityFetchData(id, api_key))
            store.dispatch(tasksFetchData(id, api_key))
        })
        .catch(() => {
            console.log('sync ended with errors')
            // scheduleSync()
        })
}
