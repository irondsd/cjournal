import { IActivity } from '../classes/Activity'
import { ITask } from '../classes/Task'
import { useActivities } from '../context/activitiesContext'
import { useAuth } from '../context/authContext'
import { useSettings } from '../context/settingsContext'
import { useTasks } from '../context/tasksContext'
import { useUser } from '../context/userContext'
import { completeTask } from '../requests/completeTask'
import { Delete, Get, Post, Put } from '../requests/newRequest'
import { uploadRequest } from '../requests/uploadRequest'
import { useEffect } from 'react'
import { login } from '../requests/login'
import timestamp from '../helpers/timestamp'
import { updateTokenBeforeExpiration } from '../constants'

const needsSync = (activity: IActivity) => {
    if (activity.system) {
        if (activity.system.awaitsSync) return true
        if (activity.system.awaitsEdit) return true
        if (activity.system.awaitsDelete) return true
    }

    return false
}

export const useSync = () => {
    const {
        activities,
        sorted,
        activitiesLoadFromArray,
        activityDeleted,
        activitySynced,
        activitySyncFailed,
    } = useActivities()
    const { loadTasksFromArray } = useTasks()
    const { access_token, token_lifetime, ongoingUpdate, refresh } = useAuth()
    const { _id, idinv, load: userLoad } = useUser()
    const { idinvFilter } = useSettings()

    const checkExpiration = async (): Promise<void> => {
        const needUpdate =
            token_lifetime - timestamp() < updateTokenBeforeExpiration
        return new Promise((resolve, reject) => {
            if (!needUpdate || ongoingUpdate) return resolve()

            refresh()
                .then(() => resolve())
                .catch(() => reject())
        })
    }

    const syncActivities = async (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            await checkExpiration()

            const activityArray = [...sorted]
            const promises = []
            activityArray.forEach(activity => {
                if (needsSync(activity)) {
                    promises.push(syncActivity(activity))
                }
            })

            if (!promises.length) return resolve()

            Promise.all(promises)
                .then(() => resolve())
                .catch(() => reject())
        })
    }

    const syncActivity = async (activity: IActivity): Promise<void> => {
        return new Promise((resolve, reject) => {
            const url =
                activity.idinv && idinvFilter
                    ? `idinv/${idinv}/activity/`
                    : `users/${_id}/activity/`

            if (activity.system?.awaitsSync) {
                if (activity.task)
                    completeTask(_id, access_token, activity.task)

                if (activity.system?.upload)
                    return uploadRequest(url, 'POST', access_token, activity)
                        .then(() => {
                            activitySynced(activity)
                            resolve()
                        })
                        .catch(err => {
                            console.log('act post upload err', err)
                            activitySyncFailed(activity)
                            reject()
                        })
                return Post(url, access_token, activity)
                    .then(() => {
                        activitySynced(activity)
                        resolve()
                    })
                    .catch(err => {
                        console.log('act post err', err)
                        activitySyncFailed(activity)
                        reject()
                    })
            } else if (activity.system?.awaitsEdit) {
                const putUrl = url + activity._id
                if (activity.system?.upload)
                    return uploadRequest(url, 'PUT', access_token, activity)
                        .then(() => {
                            activitySynced(activity)
                            resolve()
                        })
                        .catch(err => {
                            console.log('act put upload err', err)
                            activitySyncFailed(activity)
                            reject()
                        })
                return Put(putUrl, access_token, activity)
                    .then(() => {
                        activitySynced(activity)
                        resolve()
                    })
                    .catch(err => {
                        console.log('act put err', err)
                        activitySyncFailed(activity)
                        reject()
                    })
            } else if (activity.system?.awaitsDelete) {
                const deleteUrl = url + _id
                if (
                    activity.system.awaitsDelete &&
                    activity.system.awaitsSync
                ) {
                    activityDeleted(activity)
                    return resolve()
                }

                return Delete(deleteUrl, access_token, activity)
                    .then(() => {
                        activityDeleted(activity)
                        resolve()
                    })
                    .catch(err => {
                        console.log('act del err', err)
                        activitySyncFailed(activity)
                        reject()
                    })
            }
        })
    }

    const fetchActivities = async (): Promise<void> => {
        await checkExpiration()
        await syncActivities()

        const url = idinvFilter
            ? `idinv/${idinv}/activity`
            : `users/${_id}/activity`

        Get(url, access_token)
            .then((res: IActivity[]) => {
                activitiesLoadFromArray(res)
            })
            .catch(err => {
                // todo: net service
                console.log('activities fetch failed: ', err)
            })
    }

    const fetchTasks = async () => {
        await checkExpiration()

        const url = idinvFilter ? `idinv/${idinv}/tasks` : `users/${_id}/tasks`

        Get(url, access_token)
            .then((res: ITask[]) => {
                loadTasksFromArray(res)
            })
            .catch(err => {
                // todo: net service
                console.log('activities fetch failed: ', err)
            })
    }

    const fetchUser = async () => {
        await checkExpiration()

        login(access_token)
            .then(user => {
                userLoad(user)
            })
            .catch(err => {
                try {
                    const parsed = JSON.parse(err)
                    console.log(parsed)
                } catch (error) {}
                console.log('backend login err', err)
            })
    }

    useEffect(() => {
        if (!_id) fetchUser()
    }, [_id])

    return { fetchActivities, syncActivities, syncActivity, fetchTasks }
}
