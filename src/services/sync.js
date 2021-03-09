import store from '../redux/store'
import syncActivities from './syncActivities'
import Barometer from '../sensors/Barometer'
import timestamp from '../helpers/timestamp'
import NavigationService from '../navigation/NavigationService'
import {
    activityFetchFailed,
    identityUser,
    logoutUser,
    replaceTasks,
    tasksFetchFailed,
    updateActivities,
    updateUser,
    userFetchFailed,
} from '../redux/actions'
import { identityUserInfoUrl, paths } from '../constants'
import { isConnected } from './connectivityWatcher'
import { Get } from '../requests/newRequest'
import { UserInfo } from '../requests/identityRequest'

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
            let activityUrl = `users/${id}/activity`
            let tasksUrl = `users/${id}/tasks`
            const userUrl = `users/${id}`

            if (store.getState().settings.idinvFilter) {
                activityUrl = `idinv/${store.getState().user.idinv}/activity`
                tasksUrl = `idinv/${store.getState().user.idinv}/tasks`
            }

            const promises = [
                Get(activityUrl, tokens.access_token)
                    .then(res => {
                        // TODO: remove
                        console.log(res)
                        store.dispatch(updateActivities(res))
                    })
                    .catch(err => {
                        // TODO: remove
                        console.log(err)
                        store.dispatch(activityFetchFailed())
                    }),
                Get(tasksUrl, tokens.access_token)
                    .then(res => store.dispatch(replaceTasks(res)))
                    .catch(err => store.dispatch(tasksFetchFailed())),
                Get(userUrl, tokens.access_token)
                    .then(res => store.dispatch(updateUser(res)))
                    .catch(err => store.dispatch(userFetchFailed())),
                UserInfo(tokens.access_token)
                    .then(res => store.dispatch(identityUser(res)))
                    .catch(err => store.dispatch(logoutUser())),
            ]

            Promise.all(promises)
                .then(() => {
                    executing = false
                })
                .catch(() => {
                    executing = false
                })
        })
        .catch(err => {
            executing = false
            console.log('sync ended with errors', err)
        })
}
