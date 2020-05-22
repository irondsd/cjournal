import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import activityPostData from '../requests/activityPostData'
import activityFileUpload from '../requests/activityFileUpload'
import {
    activitySetId,
    activitySyncFailed,
    activitySynced,
    activityDeleted,
} from '../redux/actions/activityActions'
import activityPutData from '../requests/ActivityPutData'
import activityPutFile from '../requests/activityPutFile'
import activityDeleteData from '../requests/ActivityDeleteData'
import { moveToParentDir, downloadFile } from '../services/fs'
import GPS from '../sensors/GPS'
import { defaultDurations, paths, locationRetryLimit } from '../constants'
import idGenerator from '../helpers/idGenerator'
import { getUtcOffset } from '../helpers/dateTime'
import { addActivity, updateActivity } from '../redux/actions'

export default class Activity {
    constructor(
        id,
        activity_type,
        time_started,
        time_ended,
        utc_offset,
        tasks_id,
        idinv,
        last_updated,
        comment,
        data,
        system = {},
    ) {
        this.id = id
        this.activity_type = activity_type
        this.time_started = time_started
        this.time_ended = time_ended
        this.utc_offset = utc_offset
        this.tasks_id = tasks_id
        this.last_updated = last_updated
        this.comment = comment
        this.idinv = idinv
        this.data = data
        this.system = system
    }

    setId(id) {
        this.id = id
    }

    attachToData(data) {
        this.data = { ...this.data, ...data }
        this.setToUpdate()
    }

    setToDelete() {
        if (this.system) {
            this.system.awaitsDelete = true
        } else {
            this.system = { awaitsDelete: true }
        }
    }

    setToUpdate() {
        if (this.system) {
            this.system.awaitsEdit = true
        } else {
            this.system = { awaitsEdit: true }
        }
    }

    static instantInit(activity_type, idinv = null, comment = '', data = {}) {
        return new Activity(
            idGenerator(store.getState().user.id),
            activity_type,
            timestamp(),
            null,
            new Date().getTimezoneOffset() * -1,
            null,
            idinv,
            timestamp(),
            comment,
            data,
            { awaitsSync: true },
        )
    }

    static instantInitWithDefaultTime(
        activity_type,
        idinv = null,
        comment = '',
        data = {},
    ) {
        let time_started = timestamp() - defaultDurations[activity_type].offset
        let time_ended = time_started + defaultDurations[activity_type].duration
        data = {
            ...data,
            default_time: true,
        }

        return new Activity(
            idGenerator(store.getState().user.id),
            activity_type,
            time_started,
            time_ended,
            new Date().getTimezoneOffset() * -1,
            null,
            idinv,
            timestamp(),
            comment,
            data,
            { awaitsSync: true },
        )
    }

    static init(
        activity_type,
        time_started,
        time_ended,
        tasks_id,
        idinv,
        comment,
        data,
    ) {
        return new Activity(
            idGenerator(store.getState().user.id),
            activity_type,
            time_started,
            time_ended,
            getUtcOffset(),
            tasks_id,
            idinv,
            timestamp(),
            comment,
            data,
            { awaitsSync: true },
        )
    }

    static instantInitSave(activity_type, navigate) {
        let idinv = store.getState().user.idinv
        let activity = Activity.instantInit(activity_type, idinv)
        store.dispatch(addActivity(activity))
        navigate(paths.Home)
    }

    static async instantInitWithLocationSave(activity_type) {
        let idinv = store.getState().user.idinv
        let activity = Activity.instantInit(activity_type, idinv)
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
        if (this.id === other.id && this.id !== null) return true
        if (this.activity_type !== other.activity_type) return false
        if (this.time_started !== other.time_started) return false
        return true
    }

    isNewerThan(other) {
        return this.last_updated > other.last_updated
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

    sync(id, access_token) {
        return new Promise((resolve, reject) => {
            if (this.system.awaitsSync) {
                this.createOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        // console.log('post activity fail', error)
                        store.dispatch(activitySyncFailed(this))
                        reject(error)
                    })
            }
            if (this.system.awaitsEdit) {
                this.editOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        // console.log('put activity fail', error)
                        store.dispatch(activitySyncFailed(this))
                        reject(error)
                    })
            }
            if (this.system.awaitsDelete) {
                this.deleteOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        // console.log('delete activity fail', error)
                        store.dispatch(activitySyncFailed(this))
                        reject(error)
                    })
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

    createOnServer(id, access_token) {
        this.addLastSyncAttempt()
        return new Promise((resolve, reject) => {
            if (this.hasFiles()) {
                activityFileUpload(id, access_token, this)
                    .then(res => {
                        if (res.ok) {
                            store.dispatch(activitySynced(this))
                            resolve()
                        } else {
                            reject('post file activity fail')
                        }
                    })
                    .catch(error => {
                        // console.log('upload error', error)
                        reject(error)
                    })
            } else {
                activityPostData(id, access_token, this)
                    .then(res => {
                        if (res.ok) {
                            store.dispatch(activitySynced(this))
                            resolve()
                        } else {
                            reject('post activity fail')
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
    }

    editOnServer(id, access_token) {
        this.addLastSyncAttempt()
        return new Promise((resolve, reject) => {
            if (this.data.audioFile || this.data.photoFile) {
                activityPutFile(id, access_token, this)
                    .then(res => {
                        if (res.ok) {
                            store.dispatch(activitySynced(this))
                            resolve()
                        } else {
                            // console.log('upload error no id returned')
                            reject('upload file fail')
                        }
                    })
                    .catch(error => {
                        // console.log('upload error', error)
                        reject(error)
                    })
            } else {
                activityPutData(id, access_token, this)
                    .then(res => {
                        // console.log('successfully updated', res)
                        store.dispatch(activitySynced(this))
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
    }

    deleteOnServer(id, access_token) {
        return new Promise((resolve, reject) => {
            activityDeleteData(id, access_token, this.id)
                .then(res => {
                    // console.log('successfully deleted', res)
                    store.dispatch(activityDeleted(this))
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
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
