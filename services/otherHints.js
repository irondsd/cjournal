import AsyncStorage from '@react-native-community/async-storage'

export async function addHint(name, item) {
    if (!item) return

    let list = await AsyncStorage.getItem(name)
    list = JSON.parse(list)

    if (!list.includes(item)) {
        list = [item, ...list]
    }

    if (list.length > 10) list.pop()

    AsyncStorage.setItem(name, JSON.stringify(list))
}

export async function loadHints(name) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(name).then(res => {
            resolve(JSON.parse(res))
        })
    })
}
