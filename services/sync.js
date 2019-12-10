// import {userFetchData} from './userFetchData'
// import {activityFetchData} from './activityFetchData'
// import {tasksFetchData} from './tasksFetchData'
// import {dispatch} from 'redux'
// import store from '../store'
// import {activitySetId} from '../actions/activityActions'
// import activityPostData from './activityPostData'
// import activityPutData from './ActivityPutData'
// import activityDeleteData from './ActivityDeleteData'
// import syncActivities from './syncActivities'
// import {scheduleSync} from './connectivityWatcher'
// import Barometer from '../sensors/Barometer'

export default async function sync(id, api_key) {
    if (!id) return
    // Barometer.calibrate(20)

    // syncActivities()
    // .then(() => {
    //     console.log('sync done')

    //     store.dispatch(userFetchData(id, api_key))
    //     store.dispatch(activityFetchData(id, api_key))
    //     store.dispatch(tasksFetchData(id, api_key))
    // })
    // .catch(() => {
    //     console.log('sync ended with errors')
    //     scheduleSync()
    // })
}
