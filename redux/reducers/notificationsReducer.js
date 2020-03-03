import { notificationsAsyncSave } from '../../services/asyncStorage'
import {
    cancelLocalNotification,
    scheduleNotification,
} from '../../notifications/notifications'
import { strings } from '../../localizations'
import PushNotification from 'react-native-push-notification'

export default function notificationsReducer(state = [], { type, payload }) {
    switch (type) {
        case 'REPLACE_TASKS':
            // here we check if we have notifications scheduled for every task we have
            for (let i = 0; i < payload.length; i++) {
                if (!payload[i].completed) {
                    let dateTime = new Date(payload[i].time * 1000)
                    dateTime.setSeconds(0)
                    dateTime.setMilliseconds(0)
                    // if (new Date() > dateTime) {
                    //     // it's in the past
                    //     // let's notify in the next half an hour
                    //     dateTime = new Date()
                    //     dateTime.setSeconds(0)
                    //     dateTime.setMilliseconds(0)
                    //     if (dateTime.getHours() > 21 || dateTime.getHours() < 9) {
                    //         // if it's late, let's schedule for the next morning
                    //         dateTime.setHours(10)
                    //     }
                    //     if (dateTime.getMinutes() > 30) {
                    //         dateTime.setHours(dateTime.getHours() + 1)
                    //         dateTime.setMinutes(0)
                    //     } else {
                    //         dateTime.setMinutes(30)
                    //     }
                    // }
                    // cheching if we have a notification at this time already
                    let vacant = isVacant(state, dateTime, payload[i].id)
                    if (!vacant) dateTime.setHours(dateTime.getHours() + 1) // if so, adding 1 hour

                    let notification = {
                        id: payload[i].id,
                        time: (dateTime.getTime() + '').substring(0, 10),
                    }

                    let found = false
                    for (let i = 0; i < state.length; i++) {
                        if (areEqual(state[i], notification)) {
                            found = true
                            // only add if the saved time is behind the current time
                            if (state[i].time < notification.time) {
                                state.splice(i, 1) // removing
                                state.push(notification)
                                scheduleNotification(
                                    payload[i].id,
                                    payload[i].activity_type,
                                    strings.notifText,
                                    dateTime,
                                )
                            } // else means notification's time is behind the current one, ignore
                        }
                    }

                    if (!found) {
                        state.push(notification)
                        scheduleNotification(
                            payload[i].id,
                            payload[i].activity_type,
                            strings.notifText,
                            dateTime,
                        )
                    }
                }
            }

            for (let i = 0; i < state.length; i++) {
                index = findExists(payload, state[i])
                if (index === false) {
                    //not found, removing notification
                    cancelLocalNotification(state[i].id)
                    state.splice(i, 1)
                } else {
                    // there's id, let's check if it's completed
                    if (payload[index].completed === 1) {
                        // it is, so removing
                        cancelLocalNotification(state[i].id)
                        state.splice(i, 1)
                    }
                }
            }

            save(state)
            return state
        case 'TASK_COMPLETE':
            cancelLocalNotification(payload)
            for (let i = 0; i < state.length; i++) {
                if (state[i] === payload) {
                    state.splice(i, 1)
                }
            }
            save(state)
            return state
        case 'LOGOUT_USER':
            PushNotification.cancelAllLocalNotifications()
            return []
        case 'CANCEL_NOTIFICATION':
            cancelLocalNotification(payload)
            for (let i = 0; i < state.length; i++) {
                if (state[i] === payload) {
                    state.splice(i, 1)
                }
            }
            save(state)
            return state

        case 'LOAD_NOTIFICATIONS':
            return payload
        default:
            return state
    }
}

function save(notifications) {
    notificationsAsyncSave(notifications)
}

function areEqual(obj1, obj2) {
    if (obj1.id == obj2.id) {
        return true
    } else {
        return false
    }
}

function findExists(state, notification) {
    for (let i = 0; i < state.length; i++) {
        if (areEqual(state[i], notification)) {
            return i
        }
    }

    return false
}

function isVacant(state, dateTime, id) {
    let vacant = true
    for (let i = 0; i < state.length; i++) {
        if (state[i].time == dateTime.getTime()) {
            if (state[i].id != id) {
                vacant = false
            }
        }
    }
    return vacant
}
