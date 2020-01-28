import Toast from 'react-native-root-toast'
import { Platform } from 'react-native'

export function showToast(message) {
    // toast(message, '#005500')
}

export function showError(message) {
    // toast(message, '#550000')
}

function toast(message, color) {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: color,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        },
    })
}
