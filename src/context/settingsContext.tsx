import React, {
    FC,
    createContext,
    useReducer,
    useContext,
    useEffect,
} from 'react'
import { delayNotificationBy, Routes } from '../constants'
import { settingsAsyncSave } from '../services/asyncStorage'

const defaultState: Settings = {
    notifications: true,
    idinvFilter: false,
    notificationDelay: delayNotificationBy,
}

export type Settings = {
    notifications: boolean
    idinvFilter: boolean
    notificationDelay: number
    lastScreen?: {
        routeName: Routes
        params: {
            [key: string]: any
        }
    }
}

type SettingsFunctions = {
    restoreSettings?: (settings: Settings) => void
    toggleNotifications?: () => void
    toggleIdinvFilter?: () => void
    setNotificationDelay?: (n: number) => void
    setLastScreen?: (routeName: Routes, params: any) => void
    resetLastScreen?: () => void
}

const SettingsContext = createContext<Settings & SettingsFunctions>(
    defaultState,
)

enum Actions {
    RESTORE,
    TOGGLE_NOTIFICATIONS,
    TOGGLE_IDINV_FILTER,
    SET_NOTIFICATION_DELAY,
    SET_LAST_SCREEN,
    RESET_LAST_SCREEN,
}

function settingsReducer(
    state: Settings,
    { type, payload }: { type: Actions; payload: any },
): Settings {
    switch (type) {
        case Actions.RESTORE: {
            return payload
        }
        case Actions.TOGGLE_NOTIFICATIONS: {
            const newState = { ...state }
            newState.notifications = !newState.notifications
            return newState
        }
        case Actions.TOGGLE_IDINV_FILTER: {
            const newState = { ...state }
            newState.idinvFilter = !newState.idinvFilter
            return newState
        }
        case Actions.SET_NOTIFICATION_DELAY: {
            const newState = { ...state }
            newState.notificationDelay = payload
            return newState
        }
        case Actions.SET_LAST_SCREEN: {
            const newState = { ...state }
            newState.lastScreen = {
                routeName: payload.routeName,
                params: payload.params,
            }

            return newState
        }
        case Actions.RESET_LAST_SCREEN: {
            const newState = { ...state }
            delete newState.lastScreen
            return newState
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

const SettingsProvider: FC = ({ children }) => {
    const [settings, settingsDispatch] = useReducer(
        settingsReducer,
        defaultState,
    )

    const restoreSettings = (settings: Settings) => {
        settingsDispatch({
            type: Actions.RESTORE,
            payload: settings,
        })
    }

    const toggleNotifications = () => {
        settingsDispatch({
            type: Actions.TOGGLE_NOTIFICATIONS,
            payload: undefined,
        })
    }

    const toggleIdinvFilter = () => {
        settingsDispatch({
            type: Actions.TOGGLE_IDINV_FILTER,
            payload: undefined,
        })
    }

    const setNotificationDelay = (n: number) => {
        settingsDispatch({
            type: Actions.SET_NOTIFICATION_DELAY,
            payload: n,
        })
    }

    const setLastScreen = (routeName: Routes, params: any) => {
        settingsDispatch({
            type: Actions.SET_LAST_SCREEN,
            payload: { routeName, params },
        })
    }

    const resetLastScreen = () => {
        settingsDispatch({
            type: Actions.RESET_LAST_SCREEN,
            payload: undefined,
        })
    }

    const value = {
        ...settings,
        setLastScreen,
        resetLastScreen,
        restoreSettings,
        toggleNotifications,
        toggleIdinvFilter,
        setNotificationDelay,
    }

    useEffect(() => {
        settingsAsyncSave(settings)
    }, [settings])

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

function useSettings() {
    const context = useContext(SettingsContext)

    return context
}

export { SettingsProvider, useSettings }
