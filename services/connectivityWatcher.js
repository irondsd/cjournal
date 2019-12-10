import NetInfo from '@react-native-community/netinfo'
import sync from './sync'

let subscription
let scheduled = false

export function scheduleSync() {
    if (scheduled === false) {
        scheduled = true
        subscription = NetInfo.isConnected.addEventListener('connectionChange', listener)
    }
}

const listener = isConnected => {
    if (isConnected) {
        scheduled = false
        sync()
        subscription.remove()
    }
}
