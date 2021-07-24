import React, { createContext, useReducer, useContext } from 'react'
import { delayNotificationBy, Routes } from '../constants'

const defaultState: Settings = {
    notifications: true,
    idinvFilter: false,
    notificationDelay: delayNotificationBy,
}

type Settings = {
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
    toggleNotifications?: () => void
    toggleIdinvFilter?: () => void
    setNotificationDelay?: (n: number) => void
    setLastScreen?: (routeName: Routes, params: any) => void
    resetLastScreen?: () => void
}

const SettingsContext = createContext<Settings & SettingsFunctions>(
    defaultState,
)

function settingsReducer(state: Settings, { type, payload }): Settings {
    switch (type) {
        case 'RESTORE': {
            return payload
        }
        case 'TOGGLE_NOTIFICATIONS': {
            const newState = { ...state }
            newState.notifications = !newState.notifications
            return newState
        }
        case 'TOGGLE_IDINV_FILTER': {
            const newState = { ...state }
            newState.idinvFilter = !newState.idinvFilter
            return newState
        }
        case 'SET_NOTIFICATION_DELAY': {
            const newState = { ...state }
            newState.notificationDelay = payload
            return newState
        }
        case 'SET_LAST_SCREEN': {
            const newState = { ...state }
            newState.lastScreen = {
                routeName: payload.routeName,
                params: payload.params,
            }

            return newState
        }
        case 'RESET_LAST_SCREEN': {
            const newState = { ...state }
            delete newState.lastScreen
            return newState
        }
        default: {
            throw new Error(`Unhandled action type: ${type}`)
        }
    }
}

function SettingsProvider({ children }) {
    const [settings, settingsDispatch] = useReducer(
        settingsReducer,
        defaultState,
    )

    const restoreSettings = (settings: Settings) => {
        settingsDispatch({
            type: 'RESTORE',
            payload: settings,
        })
    }

    const toggleNotifications = () => {
        settingsDispatch({
            type: 'TOGGLE_NOTIFICATIONS',
            payload: undefined,
        })
    }

    const toggleIdinvFilter = () => {
        settingsDispatch({
            type: 'TOGGLE_IDINV_FILTER',
            payload: undefined,
        })
    }

    const setNotificationDelay = (n: number) => {
        settingsDispatch({
            type: 'SET_NOTIFICATION_DELAY',
            payload: n,
        })
    }

    const setLastScreen = (routeName: Routes, params: any) => {
        settingsDispatch({
            type: 'SET_LAST_SCREEN',
            payload: { routeName, params },
        })
    }

    const resetLastScreen = () => {
        settingsDispatch({
            type: 'RESET_LAST_SCREEN',
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
