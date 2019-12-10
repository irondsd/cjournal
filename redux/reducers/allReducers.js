import { combineReducers } from 'redux'
import activityReducer from './activityReducer'
import tasksReducer from './tasksReducer'
import userReducer from './userReducer'
import notificationsReducer from './notificationsReducer'

export const allReducers = combineReducers({
    user: userReducer,
    activity: activityReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer
})
