import React, { FC, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native'
import {
    tileMargin,
    imgSize,
    borderRadius,
    tileSize,
    tileFontSize,
} from '../constants/styles'
import LinearGradient from 'react-native-linear-gradient'
import { showError } from '../services/toast'
import { strings } from '../localization'
import ActivityIcon from './ActivityIconTS'
import { NavigationParams } from 'react-navigation'

interface TileProps {
    text: string
    color: string
    shadeColor?: string
    onPress(): void
    onLongPress(): void
    disabled?: boolean
    iconName: string
}

export type TileChildProps = {
    navigation: NavigationParams
    disabled?: boolean
}

export const Tile: FC<TileProps> = ({
    onPress,
    onLongPress,
    text,
    iconName,
    color,
    shadeColor = '#000000',
    disabled,
}) => {
    const [clicked, setClicked] = useState<boolean>(false)

    const onPressDebounce = () => {
        if (!clicked) {
            setClicked(true)
            if (!disabled) {
                onPress()
            } else {
                showError(strings.OverlapMsg)
            }

            setTimeout(() => {
                setClicked(false)
            }, 1000)
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onLongPress={() => {
                if (!disabled) {
                    onLongPress()
                } else {
                    showError(strings.OverlapMsg)
                }
            }}
            onPress={() => {
                onPressDebounce()
            }}>
            <LinearGradient
                style={styles.box}
                colors={[color, shadeColor]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}>
                <ActivityIcon icon={iconName} fill={'#ffffff'} size={imgSize} />
            </LinearGradient>
            <View style={styles.titleBox}>
                <Text adjustsFontSizeToFit style={styles.text}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: tileSize,
        marginLeft: tileMargin,
        marginRight: tileMargin,
    },
    box: {
        height: tileSize,
        backgroundColor: '#666',
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: imgSize,
        height: imgSize,
    },
    titleBox: {
        top: Platform.OS === 'ios' ? 0 : -3,
        height: tileMargin * 4.5,
    },
    text: {
        color: 'black',
        fontSize: tileFontSize,
        fontWeight: '400',
        textAlign: 'center',
    },
})
