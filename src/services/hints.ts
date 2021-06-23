import AsyncStorage from '@react-native-async-storage/async-storage'
import { hintStoragePrefix } from '../constants'
import { defaultHints } from '../constants/defaultHints'

export async function addHint(name: string, item: string) {
    if (!item) return

    const saved = await AsyncStorage.getItem(name)
    let list: string[] = JSON.parse(saved || '[]')

    if (!list.includes(item)) {
        list.unshift(item)
    } else {
        list = [item, ...list.filter(v => v !== item)]
    }
    if (list.length > 10) list.pop()

    AsyncStorage.setItem(hintStoragePrefix + name, JSON.stringify(list))
}

export function saveDefaultHints(name: string, list: string[]) {
    AsyncStorage.setItem(hintStoragePrefix + name, JSON.stringify(list))
}

export async function loadHints(name: string): Promise<string[]> {
    return new Promise(resolve => {
        AsyncStorage.getItem(hintStoragePrefix + name).then(res => {
            if (!res) return resolve([])
            resolve(JSON.parse(res))
        })
    })
}

export function resetHints() {
    for (const property in defaultHints) {
        AsyncStorage.removeItem(property)
    }
}
