// import NetInfo from '@react-native-community/netinfo'
// import sync from './sync'

let unsubscribe: () => void
let scheduled = false

export function scheduleSync() {
    if (scheduled === false) {
        scheduled = true
        // unsubscribe = NetInfo.addEventListener(state => {
        //     listener(state.isConnected)
        // })
    }
}

export async function isConnected(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // NetInfo.fetch().then(state => {
        //     resolve(state.isConnected)
        // })
    })
}

const listener = (isConnected: boolean) => {
    if (isConnected && scheduled) {
        scheduled = false
        console.log('scheduled sync fired')
        if (unsubscribe) unsubscribe()
    }
}
