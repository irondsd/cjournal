import AsyncStorage from '@react-native-async-storage/async-storage'
import { IActivityClass } from '../classes/Activity'
import { ITaskClass } from '../classes/Task'
import { ITokens } from '../classes/Tokens'
import { IUser } from '../redux/reducers/userReducer'

enum entries {
    user = 'user',
    activity = 'activity',
    tasks = 'tasks',
    screen = 'screen',
    tokens = 'tokens',
    settings = 'settings',
}

export function userAsyncSave(user: IUser) {
    AsyncStorage.mergeItem(entries.user, JSON.stringify(user))
}

export function settingsAsyncSave(settings: any) {
    AsyncStorage.setItem(entries.settings, JSON.stringify(settings))
}

export function tokensAsyncSave(tokens: ITokens) {
    AsyncStorage.setItem(entries.tokens, JSON.stringify(tokens))
}

export function activityAsyncSave(activity: IActivityClass[]) {
    AsyncStorage.setItem(entries.activity, JSON.stringify(activity))
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
