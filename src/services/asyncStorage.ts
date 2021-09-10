import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../context/userContext'
import { Activities } from '../context/activitiesContext'
import { Tasks } from '../context/tasksContext'
import { AuthState } from '../context/authContext'
import { Settings } from '../context/settingsContext'
import SInfo from 'react-native-sensitive-info'

const USER_KEY = 'USER'
const AUTH_KEY = 'AUTH'
const ACTIVITIES_KEY = 'ACTIVITY'
const TASKS_KEY = 'TASKS'
const SETTINGS_KEY = 'SETTINGS'

const SECURE_STORE_OPTIONS = {
    sharedPreferencesName: 'cjournal',
    keychainService: 'cjournal',
}

const asyncGet = (KEY: string) => {
    return AsyncStorage.getItem(KEY).then(res => {
        if (res) return JSON.parse(res)
        else return
    })
}

const asyncSave = (KEY: string, content: any) => {
    AsyncStorage.setItem(KEY, JSON.stringify(content))
}

const secureAsyncSave = (KEY: string, content: any) => {
    SInfo.setItem(KEY, JSON.stringify(content), SECURE_STORE_OPTIONS)
}

const secureAsyncGet = (KEY: string) => {
    return SInfo.getItem(KEY, SECURE_STORE_OPTIONS).then(res => {
        if (res) return JSON.parse(res)
        else return
    })
}

const secureAsyncDelete = (KEY: string) => {
    SInfo.deleteItem(KEY, SECURE_STORE_OPTIONS)
}

// ::: user :::
export function userAsyncSave(user: User) {
    return asyncSave(USER_KEY, user)
}

export function userAsyncGet(): Promise<User | undefined> {
    return asyncGet(USER_KEY)
}

// ::: settings :::
export function settingsAsyncSave(settings: Settings) {
    return asyncSave(SETTINGS_KEY, settings)
}

export function settingsAsyncGet(): Promise<Settings | undefined> {
    return asyncGet(SETTINGS_KEY)
}

// ::: auth :::
export function authAsyncSave(authState: AuthState) {
    return secureAsyncSave(AUTH_KEY, authState)
}

export function authAsyncGet(): Promise<AuthState | undefined> {
    return secureAsyncGet(AUTH_KEY)
}

// ::: activities :::
export function activitiesAsyncSave(activities: Activities) {
    return asyncSave(ACTIVITIES_KEY, activities)
}

export function activitiesAsyncGet(): Promise<Activities | undefined> {
    return asyncGet(ACTIVITIES_KEY)
}

// ::: tasks :::
export function tasksAsyncSave(tasks: Tasks) {
    return asyncSave(TASKS_KEY, tasks)
}

export function tasksAsyncGet(): Promise<Tasks | undefined> {
    return asyncGet(TASKS_KEY)
}

export function clearStorage() {
    secureAsyncDelete(AUTH_KEY)
    AsyncStorage.removeItem(USER_KEY)
    AsyncStorage.removeItem(ACTIVITIES_KEY)
    AsyncStorage.removeItem(TASKS_KEY)
    AsyncStorage.removeItem(SETTINGS_KEY)
}
