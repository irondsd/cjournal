import { combineReducers } from 'redux'
import activityReducer from './activityReducer'
import tasksReducer from './tasksReducer'
import userReducer from './userReducer'
import tokensReducer from './tokensReducer'
import settingsReducer from './settingsReducer'

export const allReducers = combineReducers({
    user: userReducer,
    activity: activityReducer,
    tasks: tasksReducer,
    tokens: tokensReducer,
    settings: settingsReducer,
})
