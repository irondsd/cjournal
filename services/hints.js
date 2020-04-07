import AsyncStorage from '@react-native-community/async-storage'
import { defaultHints } from '../constants/defaultHints'

export async function addHint(name, item) {
    if (!item) return

    let list = await AsyncStorage.getItem(name)
    list = JSON.parse(list)
    if (!list) list = []

    if (!list.includes(item)) {
        list = [item, ...list]
    } else {
        list = [
            item,
            ...list.filter(function(value, index, arr) {
                return value !== item
            }),
        ]
    }
    if (list.length > 10) list.pop()

    AsyncStorage.setItem(name, JSON.stringify(list))
}

export function saveDefaultHints(name, list) {
    AsyncStorage.setItem(name, JSON.stringify(list))
}

export async function loadHints(name) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(name).then(res => {
            if (!res) resolve([])
            resolve(JSON.parse(res))
        })
    })
}

export function resetHits() {
    for (const property in defaultHints) {
        AsyncStorage.removeItem(property)
    }
}
