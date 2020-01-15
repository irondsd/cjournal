import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import activityPostData from '../requests/activityPostData'
import activityFileUpload from '../requests/activityFileUpload'
import {
    activitySetId,
    activitySendFailed,
    activitySynced,
    activityDeleted,
} from '../redux/actions/activityActions'
import activityPutData from '../requests/ActivityPutData'
import activityPutFile from '../requests/activityPutFile'
import activityDeleteData from '../requests/ActivityDeleteData'
import { moveToParentDir, downloadFile } from '../services/fs'

export default class Activity {
    constructor(
        id,
        activity_type,
        time_started,
        time_ended,
        tasks_id,
        last_updated,
        comment,
        data,
        system = {},
    ) {
        this.id = id
        this.activity_type = activity_type
        this.time_started = time_started
        this.time_ended = time_ended
        this.tasks_id = tasks_id
        this.last_updated = last_updated
        this.comment = comment
        this.data = data
        this.system = system
    }

    setId(id) {
        this.id = id
    }

    addToData(values) {
        this.data = {
            ...this.data,
            ...values,
        }
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

    static instantInit(activity_type, comment = '', data = {}) {
        return new Activity(
            null,
            activity_type,
            timestamp(),
            null,
            null,
            timestamp(),
            comment,
            data,
        )
    }

    static init(
        activity_type,
        time_started,
        time_ended,
        tasks_id,
        comment,
        data,
    ) {
        return new Activity(
            null,
            activity_type,
            time_started,
            time_ended,
            tasks_id,
            timestamp(),
            comment,
            data,
        )
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
        if (!this.id) return false

        if (this.system) {
            if (this.system.awaitsEdit) return false
            if (this.system.awaitsDelete) return false
        }

        return true
    }

    sync(id, access_token) {
        return new Promise((resolve, reject) => {
            if (!this.id) {
                this.createOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        console.log('post activity fail', error)
                        store.dispatch(activitySendFailed(this))
                        reject()
                    })
            }
            if (this.system.awaitsEdit) {
                this.editOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        console.log('put activity fail', error)
                        store.dispatch(activitySendFailed(this))
                        reject()
                    })
            }
            if (this.system.awaitsDelete) {
                this.deleteOnServer(id, access_token)
                    .then(() => {
                        resolve()
                    })
                    .catch(error => {
                        console.log('delete activity fail', error)
                        store.dispatch(activitySendFailed(this))
                        reject()
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

    successfullySynced() {
        delete this.system
    }

    createOnServer(id, access_token) {
        return new Promise((resolve, reject) => {
            if (this.data.audioFile || this.data.photoFile) {
                activityFileUpload(id, access_token, this)
                    .then(res => {
                        if (res && res.id) {
                            // console.log('successfully uploaded', res.id)
                            store.dispatch(activitySetId(res.id, this))
                            resolve()
                        } else {
                            console.log('upload error no id returned')
                            reject()
                        }
                    })
                    .catch(error => {
                        console.log('upload error', error)
                        reject(error)
                    })
            } else {
                activityPostData(id, access_token, this)
                    .then(res => {
                        // console.log(res)
                        store.dispatch(activitySetId(res.id, this))
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
    }

    editOnServer(id, access_token) {
        return new Promise((resolve, reject) => {
            if (this.data.audioFile || this.data.photoFile) {
                activityPutFile(id, access_token, this)
                    .then(res => {
                        if (res && res.id) {
                            console.log('successfully uploaded', res)
                            store.dispatch(activitySynced(this))
                            resolve()
                        } else {
                            console.log('upload error no id returned')
                            reject('no id returned')
                        }
                    })
                    .catch(error => {
                        console.log('upload error', error)
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
            if (activity.id) {
                // if there's id, it's already synced
                // then we need to update it
                activity.setToUpdate()
            }

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
