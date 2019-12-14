import AsyncStorage from '@react-native-community/async-storage'

let entries = {
    user: 'user',
    activity: 'activity',
    tasks: 'tasks',
    notifications: 'notifications',
    screen: 'screen',
}

export function userAsyncSave(user) {
    AsyncStorage.mergeItem(entries.user, JSON.stringify(user))
}

export function activityAsyncSave(activity) {
    AsyncStorage.mergeItem(entries.activity, JSON.stringify(activity))
}

export function tasksAsyncSave(tasks) {
    AsyncStorage.mergeItem(entries.tasks, JSON.stringify(tasks))
}

export function notificationsAsyncSave(notifications) {
    AsyncStorage.setItem(entries.notifications, JSON.stringify(notifications))
}

export function screenAsyncSave(screen) {
    AsyncStorage.setItem(entries.screen, JSON.stringify(screen))
}

export async function asyncGetAll() {
    let data = {}
    await Promise.all([
        ...Object.keys(entries).map(key => {
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem(key)
                    .then(res => {
                        res = JSON.parse(res)
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
