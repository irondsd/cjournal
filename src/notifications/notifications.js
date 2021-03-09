const PushNotification = require('react-native-push-notification')
import store from '../redux/store'
import { cancelNotification } from '../redux/actions/notificationsActions'
import NavigationService from '../navigation/NavigationService'
import { strings } from '../localization'
import { showToast } from '../services/toast'
import { localTime } from '../helpers/dateTime'
import { activityPaths } from '../constants'

export function setupNotifications() {
    // console.log('notifications service initiated')
    PushNotification.configure({
        onNotification: function (notification) {
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

export function scheduleNotification(_id, title, message, dateTime) {
    PushNotification.localNotificationSchedule({
        _id: _id,
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
    // console.log(`not ${_id} scheduled for ${dateTime.toLocaleTimeString()}`)
}

export function cancelLocalNotification(_id) {
    // console.log('cancelled notification', _id)
    PushNotification.cancelLocalNotifications({ _id: _id.toString() })
    PushNotification.clearLocalNotification(_id)
}

export function dismissLocalNotification(_id) {
    _id = parseInt(_id)
    PushNotification.clearLocalNotification(_id)
}

function onNotificationOpened(notification) {
    dismissLocalNotification(notification._id)

    if (notification.action === strings.RemindLater) {
        cancelNotification(notification._id)

        // reschedule
        let dateTime = new Date()
        dateTime.setMinutes(
            dateTime.getMinutes() + store.getState().settings.notificationDelay,
        )
        scheduleNotification(
            notification._id,
            notification.title,
            notification.message,
            dateTime,
        )
        showToast(
            `${strings.Postponed} ${strings.by} ${localTime(
                store.getState().settings.notificationDelay,
            )}`,
        )
    } else {
        let _id = notification._id
        if (_id && typeof _id.valueOf() === 'string') _id = parseInt(_id)

        let task = store.getState().tasks.find(task => {
            return task._id == _id
        })

        if (task && !task.isCompleted()) {
            let navigateTo = activityPaths[task.activity_type]

            NavigationService.navigate(navigateTo, {
                task: _id,
                sender: task.activity_type,
            })
        } else {
            console.log('already completed task notification')
        }
    }
}
