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
        activitiesLoadFromArray,
        activityDeleted,
        activitySynced,
        activitySyncFailed,
    } = useActivities()
    const { loadTasksFromArray } = useTasks()
    const { access_token } = useAuth()
    const { _id, idinv } = useUser()
    const { idinvFilter } = useSettings()

    const syncActivities = () => {
        const activityArray = Object.values(activities)
        console.log(activityArray)
        activityArray.forEach(activity => {
            if (needsSync(activity)) syncActivity(activity)
        })
    }

    const syncActivity = (activity: IActivity) => {
        const url = idinv
            ? `idinv/${idinv}/activity/`
            : `users/${_id}/activity/`

        if (activity.system?.awaitsSync) {
            if (activity.task) completeTask(_id, access_token, activity.task)

            if (activity.system?.upload)
                return uploadRequest(url, 'POST', access_token, activity)
                    .then(() => {
                        activitySynced(activity)
                    })
                    .catch(err => {
                        console.log(err)
                        activitySyncFailed(activity)
                    })
            return Post(url, access_token, activity)
                .then(() => {
                    activitySynced(activity)
                })
                .catch(err => {
                    console.log(err)
                    activitySyncFailed(activity)
                })
        } else if (activity.system?.awaitsEdit) {
            const putUrl = url + _id
            if (activity.system?.upload)
                return uploadRequest(url, 'PUT', access_token, activity)
                    .then(() => {
                        activitySynced(activity)
                    })
                    .catch(err => {
                        console.log(err)
                        activitySyncFailed(activity)
                    })
            return Put(putUrl, access_token, activity)
                .then(() => {
                    activitySynced(activity)
                })
                .catch(err => {
                    console.log(err)
                    activitySyncFailed(activity)
                })
        } else if (activity.system?.awaitsDelete) {
            const deleteUrl = url + _id
            if (activity.system.awaitsDelete && activity.system.awaitsSync)
                return activityDeleted(activity)

            return Delete(deleteUrl, access_token, activity)
                .then(() => {
                    activityDeleted(activity)
                })
                .catch(err => {
                    console.log(err)
                    activitySyncFailed(activity)
                })
        }
    }

    const fetchActivities = () => {
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

    const fetchTasks = () => {
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

    return { fetchActivities, syncActivities, syncActivity, fetchTasks }
}
