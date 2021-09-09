import { ActivityTypes } from '../constants'
import { LocationType } from '../sensors/GPS'
import { BloodPressureValues } from '../components/BloodPressure'

export type Activity = {
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
    data: Data
    system?: System
}

export type System = {
    awaitsSync?: true
    awaitsEdit?: true
    awaitsDelete?: true
    failedSyncs?: number
    lastSyncAttempt?: number
    upload?: true
}

export type Data = {
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
