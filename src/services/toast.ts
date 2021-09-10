import Toast from 'react-native-root-toast'

const toast = (message: string, color: string) => {
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

export function showToast(message: string) {
    toast(message, '#005500')
}

export function showError(message: string) {
    toast(message, '#550000')
}

export function showMessage(message: string) {
    toast(message, '#5fc5d9')
}
