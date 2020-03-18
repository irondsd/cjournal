const PushNotification = require('react-native-push-notification')
import store from '../redux/store'
import { cancelNotification } from '../redux/actions/notificationsActions'
import NavigationService from '../navigation/NavigationService'
import { strings } from '../localizations'
import { showToast } from '../services/toast'

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
        // bigText: "My big text that will be shown when notification is expanded",
        vibrate: true,
        date: dateTime,
        // color: 'blue',
        largeIcon: 'app_icon', // (optional) default: "ic_launcher"
        smallIcon: 'app_icon', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        actions: `["${strings.Start}", "${strings.RemindLater}"]`,
        playSound: true, // (optional) default: true
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    })
    // console.log(`notification ${id} set on`, dateTime)
}

export function cancelLocalNotification(id) {
    console.log('cancelled notification', id)
    PushNotification.cancelLocalNotifications({ id: id.toString() })
}

function onNotificationOpened(notification) {
    // TODO: check if opens correctly
    console.log('Opened notification:', notification)
    // if (notification.action === strings.Postponed) {
    //     cancelNotification(notification.id)
    //     // reschedule
    //     let dateTime = new Date()
    //     dateTime.setMinutes(dateTime.getMinutes() + 30)
    //     scheduleNotification(
    //         notification.id,
    //         notification.title,
    //         notification.message,
    //         dateTime,
    //     )
    //     showToast(strings.Postponed)
    // } else {
    //     let task = store.getState().tasks.find(task => {
    //         return task.id == notification.id
    //     })
    //     if (!task.isCompleted()) {
    //         NavigationService.navigate(task.activity_type, {
    //             tasks_id: notification.id,
    //         })
    //     } else {
    //         console.log('already completed task notification')
    //     }
    // }
}
