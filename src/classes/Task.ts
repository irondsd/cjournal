import { ActivityTypes } from '../constants'

export type Task = {
    _id: string
    activity_type: ActivityTypes
    time: number
    completed: boolean
    updated_at: number
    idinv?: string
    user: string
    comment: string
    data: any
    notification?: Notification
}

export type Notification = {
    id: number
    time: number
    delayed?: number
}
