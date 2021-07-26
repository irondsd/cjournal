import AsyncStorage from '@react-native-async-storage/async-storage'
import { IActivityClass } from '../classes/Activity'
import { ITaskClass } from '../classes/Task'
import { ITokens } from '../classes/Tokens'
import { User } from '../context/userContext'
import { Activities } from '../context/activitiesContext'
import { AuthState } from '../context/authContext'

enum entries {
    user = 'user',
    activity = 'activity',
    tasks = 'tasks',
    screen = 'screen',
    tokens = 'tokens',
    settings = 'settings',
}

export function userAsyncSave(user: User) {
    AsyncStorage.mergeItem(entries.user, JSON.stringify(user))
}

export function settingsAsyncSave(settings: any) {
    AsyncStorage.setItem(entries.settings, JSON.stringify(settings))
}

export function tokensAsyncSave(tokens: AuthState) {
    AsyncStorage.setItem(entries.tokens, JSON.stringify(tokens))
}

export function activityAsyncSave(activity: IActivityClass[]) {
    AsyncStorage.setItem(entries.activity, JSON.stringify(activity))
}

export function activitiesAsyncSave(activities: Activities) {
    AsyncStorage.setItem(entries.activity, JSON.stringify(activities))
}

export function tasksAsyncSave(tasks: ITaskClass[]) {
    AsyncStorage.setItem(entries.tasks, JSON.stringify(tasks))
}

export function screenAsyncSave(screen: any) {
    AsyncStorage.setItem(entries.screen, JSON.stringify(screen))
}

export async function asyncGetAll() {
    const data: { [key: string]: any } = {}
    await Promise.all([
        ...Object.keys(entries).map(key => {
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem(key)
                    .then(res => {
                        res = JSON.parse(res!)
                        data[key] = res
                        resolve(res)
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }),
    ])
    return data
}

export function removeAll() {
    Object.values(entries).forEach(value => {
        AsyncStorage.removeItem(value)
    })
}

export function removeScreen() {
    AsyncStorage.removeItem(entries.screen)
}

export function tokensAsyncGet() {
    return AsyncStorage.getItem(entries.tokens).then(res => {
        if (res) return JSON.parse(res)
    })
}

export function userAsyncGet() {
    return AsyncStorage.getItem(entries.user).then(res => {
        if (res) return JSON.parse(res)
    })
}

export function settingsAsyncGet() {
    return AsyncStorage.getItem(entries.settings).then(res => {
        if (res) return JSON.parse(res)
    })
}

export function activitiesAsyncGet() {
    return AsyncStorage.getItem(entries.activity).then(res => {
        if (res) return JSON.parse(res)
        return []
    })
}

export function tasksAsyncGet() {
    return AsyncStorage.getItem(entries.tasks).then(res => {
        if (res) return JSON.parse(res)
        return []
    })
}

export function screenAsyncGet() {
    return AsyncStorage.getItem(entries.screen).then(res => {
        if (res) return JSON.parse(res)
        return
    })
}
