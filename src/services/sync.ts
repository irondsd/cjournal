import store from '../redux/store'
import syncActivities from './syncActivities'
import NavigationService from '../navigation/NavigationService'
import {
    activityFetchFailed,
    logoutUser,
    updateTasks,
    tasksFetchFailed,
    updateActivities,
    updateUser,
    userFetchFailed,
} from '../redux/actions'
import { Routes } from '../constants'
import { isConnected } from './connectivityWatcher'
import { Get, Post } from '../requests/newRequest'
import { ITokens, ITokensClass } from '../classes/Tokens'
import { IUser } from '../redux/reducers/userReducer'
import { IActivity, IActivityClass } from '../classes/Activity'
import { ITask, ITaskClass } from '../classes/Task'

let errors = 0
let executing = false

export default async function sync(id: string, tokens: ITokensClass) {
    if (!tokens || !id) return console.log('no tokens, sync aborted')

    if (executing) return console.log('sync already running')

    const activities = store.getState().activity
    tokens = store.getState().tokens

    executing = true

    if (tokens.expiresSoon()) {
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
                    NavigationService.navigate(Routes.Welcome)
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
                    .then((res: IActivityClass[]) =>
                        store.dispatch(updateActivities(res)),
                    )
                    .catch(err => store.dispatch(activityFetchFailed())),
                Get(tasksUrl, tokens.access_token)
                    .then((res: ITaskClass[]) =>
                        store.dispatch(updateTasks(res)),
                    )
                    .catch(err => store.dispatch(tasksFetchFailed())),
                Post(login, tokens.access_token)
                    .then((user: IUser) => {
                        const { identity } = user
                        store.dispatch(updateUser(user))
                    })
                    .catch(err => {
                        console.log(err)
                        store.dispatch(userFetchFailed())
                    }),
            ]

            Promise.all(promises as any)
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
