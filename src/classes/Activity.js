import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import { Post, Put, Delete } from '../requests/newRequest'
import {
    activitySetId,
    activitySyncFailed,
    activitySynced,
    activityDeleted,
    addActivity,
    updateActivity,
} from '../redux/actions'
import { moveToParentDir, downloadFile } from '../services/fs'
import GPS from '../sensors/GPS'
import { defaultDurations, paths, locationRetryLimit } from '../constants'
import { getUtcOffset } from '../helpers/dateTime'
import { uploadRequest } from '../requests/uploadRequest'
import objectId from '../helpers/objectId'

export default class Activity {
    constructor(activity) {
        this._id = activity._id
        this.activity_type = activity.activity_type
        this.time_started = activity.time_started || timestamp()
        this.time_ended = activity.time_ended
        this.utc_offset = activity.utc_offset || getUtcOffset()
        this.task = activity.task
        this.updated_at = activity.updated_at || timestamp()
        this.comment = activity.comment
        this.idinv = activity.idinv
        this.user = activity.user
        this.patient = activity.patient
        this.data = activity.data || {}
        this.system = activity.system
    }

    setId(_id) {
        this._id = _id
    }

    attachToData(data) {
        this.data = { ...this.data, ...data }
        this.setToUpdate()
    }

    setToDelete() {
        if (!this.system) this.system = {}
        this.system.awaitsDelete = true
    }

    setToUpdate() {
        if (this.system) {
            this.system.awaitsEdit = true
        } else {
            this.system = { awaitsEdit: true }
        }
    }

    static instantInit(activity_type, comment = '', data = {}) {
        return new Activity({
            _id: objectId(),
            activity_type: activity_type,
            time_started: timestamp(),
            time_ended: undefined,
            utc_offset: getUtcOffset(),
            task: null,
            user: store.getState().user._id,
            patient: store.getState().user.patient,
            idinv: store.getState().user.idinv,
            updated_at: timestamp(),
            comment: comment,
            data: data,
            system: { awaitsSync: true },
        })
    }

    static instantInitWithDefaultTime(activity_type, comment = '', data = {}) {
        let time_started = timestamp() - defaultDurations[activity_type].offset
        let time_ended = time_started + defaultDurations[activity_type].duration
        data = {
            ...data,
            default_time: true,
        }

        return new Activity({
            _id: objectId(),
            activity_type: activity_type,
            time_started: timestamp(),
            time_ended: undefined,
            utc_offset: getUtcOffset(),
            task: null,
            user: store.getState().user._id,
            patient: store.getState().user.patient,
            idinv: store.getState().user.idinv,
            updated_at: timestamp(),
            comment: comment,
            data: data,
            system: { awaitsSync: true },
        })
    }

    static init(activity_type, time_started, time_ended, task, comment, data) {
        return new Activity({
            _id: objectId(),
            activity_type: activity_type,
            time_started: time_started,
            time_ended: time_ended,
            utc_offset: getUtcOffset(),
            task: task,
            user: store.getState().user._id,
            patient: store.getState().user.patient,
            idinv: store.getState().user.idinv,
            updated_at: timestamp(),
            comment: comment,
            data: data,
            system: { awaitsSync: true },
        })
    }

    static instantInitSave(activity_type, navigate) {
        const activity = Activity.instantInit(activity_type)
        store.dispatch(addActivity(activity))
        navigate(paths.Home)
    }

    static async instantInitWithLocationSave(activity_type) {
        let activity = Activity.instantInit(activity_type)
        store.dispatch(addActivity(activity))

        // retry location for 5 times
        for (let i = 0; i < locationRetryLimit; i++) {
            try {
                let res = await activity.attachLocation()
                // console.log('location success')
                store.dispatch(updateActivity(activity, activity))
                break
            } catch (err) {
                console.log(err)
            }
        }
    }

    isEqual(other) {
        if (this._id === other._id && this._id !== null) return true
        if (this.activity_type !== other.activity_type) return false
        if (this.time_started !== other.time_started) return false
        return true
    }

    isNewerThan(other) {
        return this.updated_at > other.updated_at
    }

    synced() {
        if (this.system) {
            if (this.system.awaitsSync) return false
            if (this.system.awaitsEdit) return false
            if (this.system.awaitsDelete) return false
        }

        return true
    }

    hasFiles() {
        if (this.data.audioFile || this.data.photoFile) return true
        return false
    }

    sync(_id, access_token) {
        return new Promise((resolve, reject) => {
            if (this.system.awaitsSync) {
                return this.createOnServer(_id, access_token)
                    .then(res => resolve(store.dispatch(activitySynced(this))))
                    .catch(error =>
                        reject(store.dispatch(activitySyncFailed(this))),
                    )
            }
            if (this.system.awaitsEdit) {
                return this.editOnServer(_id, access_token)
                    .then(res => resolve(store.dispatch(activitySynced(this))))
                    .catch(error =>
                        reject(store.dispatch(activitySyncFailed(this))),
                    )
            }
            if (this.system.awaitsDelete) {
                return this.deleteOnServer(_id, access_token)
                    .then(() => resolve(store.dispatch(activityDeleted(this))))
                    .catch(error =>
                        reject(store.dispatch(activitySyncFailed(this))),
                    )
            }
        })
    }

    increaseFailedSyncCount() {
        if (this.system) {
            if (!this.system.failedSyncs) {
                this.system.failedSyncs = 1
            } else {
                this.system.failedSyncs += 1
            }
        } else {
            this.system = {}
            this.system.failedSyncs = 1
        }
    }

    addLastSyncAttempt() {
        if (!this.system) this.system = {}
        this.system.lastSyncAttempt = timestamp()
    }

    successfullySynced() {
        delete this.system
    }

    createOnServer(_id, access_token) {
        this.addLastSyncAttempt()

        const path = store.getState().settings.idinvFilter
            ? `idinv/${store.getState().user.idinv}/activity/`
            : `users/${_id}/activity/`

        if (this.system?.upload)
            return uploadRequest(path, 'POST', access_token, this)
        else return Post(path, access_token, this)
    }

    editOnServer(_id, access_token) {
        this.addLastSyncAttempt()

        const path = store.getState().settings.idinvFilter
            ? `idinv/${store.getState().user.idinv}/activity/${this._id}`
            : `users/${_id}/activity/${this._id}`

        if (this.system?.upload)
            return uploadRequest(path, 'PUT', access_token, this)
        else return Put(path, access_token, this)
    }

    deleteOnServer(_id, access_token) {
        return Delete(`users/${_id}/activity/${this._id}`, access_token)
    }

    attachLocation() {
        return new Promise((resolve, reject) => {
            let GPSClass = new GPS()
            GPSClass.getPosition()
                .then(position => {
                    this.attachToData({
                        position: [position.coords],
                    })
                    resolve('Success')
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export function addOrUpdate(array, activity) {
    if (activity.data.audio) downloadFile(activity.data.audio)
    if (activity.data.image) downloadFile(activity.data.image)

    let found = false
    for (let i = 0; i < array.length; i++) {
        if (activity.isEqual(array[i])) {
            found = true
            if (activity.isNewerThan(array[i])) {
                if (array[i].data.audioFile || array[i].data.photoFile) {
                    if (array[i].data.audioFile && activity.data.audio) {
                        moveFile(array[i].data.audioFile, activity.data.audio)
                    }
                    if (array[i].data.photoFile && activity.data.image) {
                        moveFile(array[i].data.photoFile, activity.data.image)
                    }
                }

                array[i] = activity
            } else if (array[i].isNewerThan(activity)) {
                // we have a newer version locally
                array[i].setToUpdate()
            }
        }
    }

    if (!found) {
        array.push(activity)
    }

    return array
}

function moveFile(filepath, filename) {
    filename = filename.split('/')[1]
    moveToParentDir(filepath, filename)
}

export function update(array, originalActivity, activity) {
    for (let i = 0; i < array.length; i++) {
        if (originalActivity.isEqual(array[i])) {
            activity.setToUpdate()
            array[i] = activity
        }
    }
}

export function remove(array, activity) {
    array = array.filter(element => {
        return !activity.isEqual(element)
    })
    return array
}

export function exists(array, activity) {
    for (element of array) {
        if (activity.isEqual(element)) {
            // found
            return true
        }
    }
    // not found
    return false
}

export function sort(array) {
    function compare(a, b) {
        if (a.time_started > b.time_started) return -1
        if (a.time_started < b.time_started) return 1
        return 0
    }

    return array.sort(compare)
}
