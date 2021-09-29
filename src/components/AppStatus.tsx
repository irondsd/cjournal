import React, { FC, useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    Platform,
} from 'react-native'
import { Icon } from './Icon'
import { useBarometer } from '../hooks/useBarometer'
import { useGeolocation } from '../hooks/useGeolocation'
import { usePedometer } from '../hooks/usePedometer'
import { getFilesCount } from '../services/fs'
import { strings } from '../localization'

const OkayIcon = () => (
    <Icon name="check-circle" set="Feather" size={25} color="green" />
)
const ErrorIcon = () => (
    <Icon name="alert-circle" set="Feather" size={25} color="red" />
)

type StatusLineProps = {
    title: string
}

const StatusLine: FC<StatusLineProps> = ({ title, children }) => {
    return (
        <View style={styles.line}>
            <Text style={styles.text}>{`${title}:`}</Text>
            <View style={styles.res}>{children}</View>
        </View>
    )
}

export const AppStatus: FC = () => {
    const { isAvailable: isBarometerAvailable } = useBarometer()
    const { isAvailable: isGeolocationAvailable } = useGeolocation()
    const { isAvailable: isPedometerAvailable } = usePedometer()
    const [filesStored, setFilesStored] = useState(0)

    const [permissions, setPermissions] = useState({
        Camera: false,
        Microphone: false,
        Geolocation: false,
        ReadStorage: false,
        WriteStorage: false,
    })

    useEffect(() => {
        getFilesCount().then(res => setFilesStored(res))

        const list = {
            Camera: PermissionsAndroid.PERMISSIONS.CAMERA,
            Microphone: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            Geolocation: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ReadStorage: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            WriteStorage: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        }

        for (const [name, permission] of Object.entries(list)) {
            PermissionsAndroid.check(permission).then(value => {
                setPermissions(prev => {
                    return {
                        ...prev,
                        [name]: value,
                    }
                })
            })
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{strings.Sensors}</Text>
            <StatusLine title={strings.Barometer}>
                {isBarometerAvailable ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <StatusLine title={strings.Geolocation}>
                {isGeolocationAvailable ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <StatusLine title={strings.Pedometer}>
                {isPedometerAvailable ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <View style={styles.divider} />
            <Text style={styles.title}>{strings.Storage}</Text>
            <StatusLine title={strings.FilesStored}>
                <Text>{filesStored}</Text>
            </StatusLine>
            <View style={styles.divider} />
            {Platform.OS === 'android' && (
                <>
                    <Text style={styles.title}>{strings.Permissions}</Text>
                    {Object.entries(permissions).map(([name, value]) => {
                        return (
                            <StatusLine
                                title={strings[name as keyof typeof strings]}>
                                {value ? <OkayIcon /> : <ErrorIcon />}
                            </StatusLine>
                        )
                    })}
                    <View style={styles.divider} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 20,
        color: '#000000',
    },
    text: {
        paddingLeft: 10,
        width: '90%',
    },
    res: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 5,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        margin: 10,
        height: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#00000010',
    },
})
