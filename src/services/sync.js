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
import { Get, Post } from '../requests/newRequest'
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
            const login = `login`

            if (store.getState().settings.idinvFilter) {
                activityUrl = `idinv/${store.getState().user.idinv}/activity`
                tasksUrl = `idinv/${store.getState().user.idinv}/tasks`
            }

            const promises = [
                Get(activityUrl, tokens.access_token)
                    .then(res => store.dispatch(updateActivities(res)))
                    .catch(err => store.dispatch(activityFetchFailed())),
                Get(tasksUrl, tokens.access_token)
                    .then(res => store.dispatch(replaceTasks(res)))
                    .catch(err => store.dispatch(tasksFetchFailed())),
                Post(login, tokens.access_token)
                    .then(user => {
                        const { identity } = user
                        store.dispatch(updateUser(user))
                        store.dispatch(identityUser(identity))
                    })
                    .catch(err => store.dispatch(userFetchFailed())),
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
