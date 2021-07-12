import React, { FC } from 'react'
import { Text, View, Switch, StyleSheet, Platform } from 'react-native'
import { placeholderGrey, secondaryColor } from '../../constants'

type ToggleSwitchProps = {
    title: string
    value: boolean
    onChange: (v: boolean) => void
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
    title,
    value,
    onChange,
}) => {
    return (
        <View style={styles.View}>
            <Text style={styles.Text}>{title}</Text>
            <Switch
                onValueChange={onChange}
                value={value}
                trackColor={{
                    true: placeholderGrey,
                    false: Platform.OS == 'android' ? '#d3d3d3' : '#fbfbfb',
                }}
                thumbColor={
                    Platform.OS == 'ios'
                        ? '#fff'
                        : value
                        ? secondaryColor
                        : '#fff'
                }
                ios_backgroundColor="#fbfbfb"
            />
        </View>
    )
}

var styles = StyleSheet.create({
    View: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    Text: {
        fontSize: 17,
        width: '100%',
        flex: 1,
        flexShrink: 0,
    },
})
