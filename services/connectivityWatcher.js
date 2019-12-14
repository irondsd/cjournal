import NetInfo from '@react-native-community/netinfo'
import sync from './sync'

let unsubscribe
let scheduled = false

export function scheduleSync() {
    if (scheduled === false) {
        scheduled = true
        unsubscribe = NetInfo.addEventListener(state => {
            listener(state.isConnected)
        })
    }
}

// TODO: device between error resync and no connection resync

const listener = isConnected => {
    if (isConnected && scheduled) {
        scheduled = false
        sync()
        if (unsubscribe) unsubscribe()
    }
}
