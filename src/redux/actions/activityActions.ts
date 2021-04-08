import {
    REPLACE_ACTIVITIES,
    ADD_ACTIVITY,
    UPDATE_ACTIVITIES,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    ACTIVITY_SYNC_FAILED,
    ACTIVITY_FETCH_FAILED,
    ACTIVITY_SYNCED,
    ACTIVITY_DELETED,
    LOGOUT_USER,
} from '../types'
import { IActivityClass } from '../../classes/Activity'

export const addActivity = (activity: IActivityClass) => {
    return {
        type: ADD_ACTIVITY,
        payload: activity,
    }
}

export const replaceActivities = (activity: IActivityClass) => {
    return {
        type: REPLACE_ACTIVITIES,
        payload: activity,
    }
}

export const updateActivities = (activities: IActivityClass[]) => {
    return {
        type: UPDATE_ACTIVITIES,
        payload: activities,
    }
}

export const updateActivity = (activity: IActivityClass) => {
    return {
        type: UPDATE_ACTIVITY,
        payload: activity,
    }
}

export const deleteActivity = (activity: IActivityClass) => {
    return {
        type: DELETE_ACTIVITY,
        payload: activity,
    }
}

export const activitySynced = (activity: IActivityClass) => {
    return {
        type: ACTIVITY_SYNCED,
        payload: activity,
    }
}

export const activityDeleted = (activity: IActivityClass) => {
    return {
        type: ACTIVITY_DELETED,
        payload: activity,
    }
}

export const activitySyncFailed = (activity: IActivityClass) => {
    return {
        type: ACTIVITY_SYNC_FAILED,
        payload: activity,
    }
}

export const activityFetchFailed = () => {
    return {
        type: ACTIVITY_FETCH_FAILED,
    }
}

export const logoutUserActivity = () => {
    return {
        type: LOGOUT_USER,
    }
}
