import timestamp from '../helpers/timestamp'
import store from '../redux/store'
import { Post, Put, Delete } from '../requests/newRequest'
import {
    activitySyncFailed,
    activitySynced,
    activityDeleted,
    addActivity,
    updateActivity,
} from '../redux/actions'
import { moveToParentDir, downloadFile } from '../services/fs'
import GPS from '../sensors/GPS'
import {
    ActivityTypes,
    defaultDurations,
    Routes,
    locationRetryLimit,
} from '../constants'
import { getUtcOffset } from '../helpers/dateTime'
import { uploadRequest } from '../requests/uploadRequest'
import objectId from '../helpers/objectId'
import { LocationType } from '../sensors/GPS'
import { objectCleanUp } from '../helpers/utils'
import { BloodPressureValues } from '../components/BloodPressureTS'

export interface IActivity {
    _id: string
    activity_type: ActivityTypes
    time_started: number
    time_ended?: number
    utc_offset?: number
    task?: string
    updated_at: number
    comment?: string
    idinv?: string
    user: string
    patient?: string
    data: IAData
    system?: IASystem
}

export interface IActivityClass extends IActivity {
    isEqual(other: IActivity): boolean
    isNewerThan(other: IActivity): boolean
    synced(): boolean
    hasFiles(): boolean
    hasLocation(): boolean
    hasPhoto(): boolean
    hasAudio(): boolean
    hasComment(): boolean
    sync(_id: string, access_token: string): void
    increaseFailedSyncCount(): void
    addLastSyncAttempt(): void
    successfullySynced(): void
    createOnServer(_id: string, access_token: string): void
    editOnServer(_id: string, access_token: string): void
    deleteOnServer(_id: string, access_token: string): void
    attachLocation(): void
    setToUpdate(): void
    setToDelete(): void
}

export interface IASystem {
    awaitsSync?: true
    awaitsEdit?: true
    awaitsDelete?: true
    failedSyncs?: number
    lastSyncAttempt?: number
    upload?: true
}

export interface IAData {
    pill?: string
    steps?: number
    distance?: number
    locations?: LocationType[]
    default_time?: true
    audioFile?: string
    photoFile?: string
    logFile?: string
    log?: string
    audio?: string
    image?: string
    type?: string
    feeling?: string
    bloodPressure?: BloodPressureValues
    calories?: number
}

export default class Activity implements IActivityClass {
    _id: string
    activity_type: ActivityTypes
    time_started: number
    time_ended?: number
    utc_offset?: number
    task?: string
    updated_at: number
    comment: string
    idinv?: string
    user: string
    patient?: string
    data: IAData
    system?: IASystem

    constructor(activity: any) {
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
        this.data = objectCleanUp(activity.data) || {}
        this.system = activity.system
    }

    attachToData(data: IAData) {
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

    static instantInit(
        activity_type: string,
        comment: string = '',
        data: IAData = {},
    ) {
        return new Activity({
            _id: objectId(),
            activity_type: activity_type,
            time_started: timestamp(),
            time_ended: undefined,
            utc_offset: getUtcOffset(),
            task: undefined,
            user: store.getState().user._id,
            patient: store.getState().user.patient,
            idinv: store.getState().user.idinv,
            updated_at: timestamp(),
            comment: comment,
            data: data,
            system: { awaitsSync: true },
        })
    }

    static instantInitWithDefaultTime(
        activity_type: string,
        comment: string = '',
        data: IAData = {},
    ): IActivityClass {
        let time_started =
            timestamp() -
            defaultDurations[activity_type as keyof typeof defaultDurations]
                .offset
        let time_ended =
            time_started +
            defaultDurations[activity_type as keyof typeof defaultDurations]
                .duration
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
            task: undefined,
            user: store.getState().user._id,
            patient: store.getState().user.patient,
            idinv: store.getState().user.idinv,
            updated_at: timestamp(),
            comment: comment,
            data: data,
            system: { awaitsSync: true },
        })
    }

    static init(
        activity_type: string,
        time_started: number,
        time_ended: number | undefined,
        task: string | undefined,
        comment: string | undefined,
        data: IAData = {},
    ): IActivityClass {
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

    static instantInitSave(activity_type: string, navigate: any) {
        const activity = Activity.instantInit(activity_type)
        store.dispatch(addActivity(activity))
        navigate(Routes.Home)
    }

    static async instantInitWithLocationSave(activity_type: string) {
        let activity = Activity.instantInit(activity_type)
        store.dispatch(addActivity(activity))

        // retry location for 5 times
        for (let i = 0; i < locationRetryLimit; i++) {
            try {
                let res = await activity.attachLocation()
                // console.log('location success')
                store.dispatch(updateActivity(activity))
                break
            } catch (err) {
                console.log(err)
            }
        }
    }

    isEqual(other: IActivity): boolean {
        return this._id === other._id
    }

    isNewerThan(other: IActivity): boolean {
        return this.updated_at > other.updated_at
    }

    synced(): boolean {
        if (this.system) {
            if (this.system.awaitsSync) return false
            if (this.system.awaitsEdit) return false
            if (this.system.awaitsDelete) return false
        }

        return true
    }

    hasFiles() {
        const data = objectCleanUp(this.data)
        return !!Object.keys(data).find(key => key.endsWith('File'))
    }

    hasLocation() {
        return !!this.data?.locations
    }

    hasPhoto() {
        return !!this.data?.photoFile || !!this.data?.image
    }

    hasAudio() {
        return !!this.data?.audioFile || !!this.data?.audio
    }

    hasComment() {
        return !!this.comment
    }

    applyUser() {
        if (!this.user) this.user = store.getState().user._id
        if (!this.idinv) this.idinv = store.getState().user.idinv
    }

    sync(_id: string, access_token: string) {
        return new Promise((resolve, reject) => {
            this.applyUser()

            if (this.system?.awaitsSync) {
                return this.createOnServer(_id, access_token)
                    .then(res => resolve(store.dispatch(activitySynced(this))))
                    .catch(error =>
                        reject(store.dispatch(activitySyncFailed(this))),
                    )
            } else if (this.system?.awaitsEdit) {
                return this.editOnServer(_id, access_token)
                    .then(res => resolve(store.dispatch(activitySynced(this))))
                    .catch(error =>
                        reject(store.dispatch(activitySyncFailed(this))),
                    )
            } else if (this.system?.awaitsDelete) {
                if (this.system.awaitsDelete && this.system.awaitsSync)
                    return Promise.resolve(activityDeleted(this))
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

    createOnServer(_id: string, access_token: string) {
        this.addLastSyncAttempt()

        const path = store.getState().settings.idinvFilter
            ? `idinv/${store.getState().user.idinv}/activity/`
            : `users/${_id}/activity/`

        if (this.system?.upload)
            return uploadRequest(path, 'POST', access_token, this)
        else return Post(path, access_token, this)
    }

    editOnServer(_id: string, access_token: string) {
        this.addLastSyncAttempt()

        const path = store.getState().settings.idinvFilter
            ? `idinv/${store.getState().user.idinv}/activity/${this._id}`
            : `users/${_id}/activity/${this._id}`

        if (this.system?.upload)
            return uploadRequest(path, 'PUT', access_token, this)
        else return Put(path, access_token, this)
    }

    deleteOnServer(_id: string, access_token: string) {
        return Delete(`users/${_id}/activity/${this._id}`, access_token)
    }

    attachLocation() {
        return new Promise((resolve, reject) => {
            let GPSClass = new GPS()
            GPSClass.getPosition()
                .then(position => {
                    this.attachToData({
                        locations: [position.coords],
                    })
                    resolve('Success')
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export function addOrUpdate(array: IActivityClass[], activity: IActivityClass) {
    if (activity.data?.audio) downloadFile(activity.data.audio)
    if (activity.data?.image) downloadFile(activity.data.image)

    let found = false
    for (let i = 0; i < array.length; i++) {
        if (activity.isEqual(array[i])) {
            found = true
            if (activity.isNewerThan(array[i])) {
                if (array[i].data.audioFile || array[i].data.photoFile) {
                    if (array[i].data.audioFile && activity.data.audio) {
                        moveFile(array[i].data.audioFile!, activity.data.audio)
                    }
                    if (array[i].data.photoFile && activity.data.image) {
                        moveFile(array[i].data.photoFile!, activity.data.image)
                    }
                }

                array[i] = activity
            } else if (array[i].isNewerThan(activity)) {
                // we have a newer version locally
                array[i].setToUpdate()
            }
            break
        }
    }

    if (!found) {
        array.push(activity)
    }

    return array
}

function moveFile(filepath: string, filename: string) {
    filename = filename.split('/')[1]
    moveToParentDir(filepath, filename)
}

export function remove(array: IActivityClass[], activity: IActivityClass) {
    array = array.filter(element => {
        return !activity.isEqual(element)
    })
    return array
}

export function exists(array: IActivityClass[], activity: IActivityClass) {
    for (const element of array) {
        if (activity.isEqual(element)) {
            // found
            return true
        }
    }
    // not found
    return false
}

export function sort(array: IActivityClass[]): IActivityClass[] {
    function compare(a: IActivity, b: IActivity) {
        if (a.time_started > b.time_started) return -1
        if (a.time_started < b.time_started) return 1
        return 0
    }

    return array.sort(compare)
}
