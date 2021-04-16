import PushNotification from 'react-native-push-notification'
import store from '../redux/store'
import NavigationService from '../navigation/NavigationService'
import { strings } from '../localization'
import { showToast } from '../services/toast'
import { localTime } from '../helpers/dateTime'
import { activityPaths } from '../constants'
import timestamp from '../helpers/timestamp'
import { taskCancelNotification } from '../redux/actions'

type FiredNotification = {
    actions: string[]
    action?: string
    fireDate: number
    title: string
    foreground: boolean
    id: string
    message: string
    notificationId: number
    userInteraction: boolean
    userInfo: string
}

export function setupNotifications() {
    console.log('notifications service initiated')
    PushNotification.configure({
        onNotification: (notification: any) => {
            onNotificationOpened(notification)
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    })
}

export function scheduleNotification(
    id: string,
    title: string,
    message: string,
    time: number,
) {
    const notificationTitle: string = strings[title]

    PushNotification.localNotificationSchedule({
        id: time,
        title: notificationTitle,
        message: message,
        vibrate: true,
        date: new Date(time * 1000),
        largeIcon: 'app_icon', // (optional) default: "ic_launcher"
        smallIcon: 'app_icon', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        actions: [strings.Start, strings.RemindLater],
        playSound: true, // (optional) default: true
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        soundName: 'default',
        userInfo: id,
    })
    console.log(`notification with id ${time} scheduled`)
}

export function cancelLocalNotification(id: number) {
    console.log('cancelled notification', id)
    PushNotification.cancelLocalNotifications({ id: `${id}` })
    // @ts-ignore: wrong imported types
    PushNotification.clearLocalNotification(id)
}

export function dismissLocalNotification(id: number) {
    // @ts-ignore: wrong imported types
    PushNotification.clearLocalNotification(id)
}

export function cancelAllLocalNotifications() {
    PushNotification.cancelAllLocalNotifications()
}

function onNotificationOpened(notification: FiredNotification) {
    cancelLocalNotification(notification.notificationId)

    if (notification.action === strings.RemindLater) {
        // todo: not working
        const { notificationDelay } = store.getState().settings
        const time = timestamp() + notificationDelay * 60
        const id = notification.userInfo

        // reschedule
        scheduleNotification(id, notification.title, notification.message, time)
        showToast(
            `${strings.Postponed} ${strings.by} ${localTime(
                notificationDelay,
            )}`,
        )
    } else {
        const taskId = parseInt(notification.userInfo)

        let task = store.getState().tasks.find(task => {
            return task.notification?.id === taskId
        })

        if (task && !task.isCompleted()) {
            taskCancelNotification(task)
            let navigateTo =
                activityPaths[task.activity_type as keyof typeof activityPaths]

            NavigationService.navigate(navigateTo, {
                task: task._id,
                sender: task.activity_type,
            })
        } else {
            // there's no task or
            // task is completed
        }
    }
}
