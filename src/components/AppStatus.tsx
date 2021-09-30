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
import { useUser } from '../context/userContext'
import { useAuth } from '../context/authContext'
import timestamp from '../helpers/timestamp'
import { Get } from '../requests/newRequest'
import { UserInfo } from '../requests/identityRequest'

const PERMISSIONS_LIST = {
    Camera: PermissionsAndroid.PERMISSIONS.CAMERA,
    Microphone: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    Geolocation: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ReadStorage: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    WriteStorage: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
}

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
    const { _id, idinv } = useUser()
    const { access_token, token_lifetime } = useAuth()
    const [backendAvailable, setBackendAvailable] = useState(false)
    const [identityAvailable, setIdentityAvailable] = useState(false)

    const [permissions, setPermissions] = useState({
        Camera: false,
        Microphone: false,
        Geolocation: false,
        ReadStorage: false,
        WriteStorage: false,
    })

    useEffect(() => {
        getFilesCount().then(res => setFilesStored(res))

        for (const [name, permission] of Object.entries(PERMISSIONS_LIST)) {
            PermissionsAndroid.check(permission).then(value => {
                setPermissions(prev => {
                    return {
                        ...prev,
                        [name]: value,
                    }
                })
            })
        }
        if (access_token) {
            Get('alive', access_token).then(res => {
                console.log('backendres ', res)
                setBackendAvailable(true)
            })
            UserInfo(access_token).then(res => {
                console.log('identity res', res)
                setIdentityAvailable(true)
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
            <Text style={styles.title}>{strings.Storage}</Text>
            <StatusLine title={strings.FilesStored}>
                <Text>{filesStored}</Text>
            </StatusLine>
            <View style={styles.divider} />
            <Text style={styles.title}>{strings.Connectivity}</Text>
            <StatusLine title={'Identity'}>
                {isPedometerAvailable ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <StatusLine title={'Backend'}>
                {isPedometerAvailable ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <StatusLine title={'Tokens'}>
                {
                    <Text>
                        {token_lifetime
                            ? token_lifetime - timestamp()
                            : 'Unavailable'}
                    </Text>
                }
            </StatusLine>
            <StatusLine title={'User'}>
                {_id ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <StatusLine title={'Idinv'}>
                {idinv ? <OkayIcon /> : <ErrorIcon />}
            </StatusLine>
            <View style={styles.divider} />
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
        width: '80%',
    },
    res: {
        height: 30,
        justifyContent: 'center',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    divider: {
        margin: 10,
        height: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#00000010',
    },
})
