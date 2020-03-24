const PushNotification = require('react-native-push-notification')
import store from '../redux/store'
import { cancelNotification } from '../redux/actions/notificationsActions'
import NavigationService from '../navigation/NavigationService'
import { strings } from '../localizations'
import { showToast } from '../services/toast'
import { localTime } from '../helpers/dateTime'
import { postponeNotificationBy } from '../constants/'

export function setupNotifications() {
    console.log('notifications service initiated')
    PushNotification.configure({
        onNotification: function(notification) {
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

export function scheduleNotification(id, title, message, dateTime) {
    PushNotification.localNotificationSchedule({
        id: id.toString(),
        title: strings[title],
        message: message,
        vibrate: true,
        date: dateTime,
        largeIcon: 'app_icon', // (optional) default: "ic_launcher"
        smallIcon: 'app_icon', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        actions: `["${strings.Start}", "${strings.RemindLater}"]`,
        playSound: true, // (optional) default: true
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        soundName: 'default',
    })
    // console.log(`not ${id} scheduled for ${dateTime.toLocaleTimeString()}`)
}

export function cancelLocalNotification(id) {
    console.log('cancelled notification', id)
    PushNotification.cancelLocalNotifications({ id: id.toString() })
    PushNotification.clearLocalNotification(id)
}

export function dismissLocalNotification(id) {
    id = parseInt(id)
    PushNotification.clearLocalNotification(id)
}

function onNotificationOpened(notification) {
    dismissLocalNotification(notification.id)

    if (notification.action === strings.RemindLater) {
        cancelNotification(notification.id)

        // reschedule
        let dateTime = new Date()
        dateTime.setMinutes(dateTime.getMinutes() + postponeNotificationBy)
        scheduleNotification(
            notification.id,
            notification.title,
            notification.message,
            dateTime,
        )
        showToast(
            `${strings.Postponed} ${strings.by} ${localTime(
                postponeNotificationBy,
            )}`,
        )
    } else {
        let task = store.getState().tasks.find(task => {
            return task.id == notification.id
        })
        if (task && !task.isCompleted()) {
            NavigationService.navigate(task.activity_type, {
                tasks_id: notification.id,
            })
        } else {
            console.log('already completed task notification')
        }
    }
}
