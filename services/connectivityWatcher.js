import NetInfo from '@react-native-community/netinfo'
import sync from './sync'

let unsubscribe
let scheduled = false
// TODO: fix require cycle?
export function scheduleSync() {
    if (scheduled === false) {
        scheduled = true
        unsubscribe = NetInfo.addEventListener(state => {
            listener(state.isConnected)
        })
    }
}

export async function isConnected() {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            resolve(state.isConnected)
        })
    })
}

const listener = isConnected => {
    if (isConnected && scheduled) {
        scheduled = false
        sync()
        if (unsubscribe) unsubscribe()
    }
}
