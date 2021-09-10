import React, { FC } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { strings } from '../localization'
import { borderGrey, secondaryGrey } from '../constants'

export enum TimeSwitchValues {
    fromStart,
    fromEnd,
}

interface TimeSwitchProps {
    value: TimeSwitchValues
    onChange: (value: TimeSwitchValues) => void
}

export const TimeSwitch: FC<TimeSwitchProps> = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onChange(TimeSwitchValues.fromStart)}
                style={[
                    styles.button,
                    value === TimeSwitchValues.fromStart
                        ? styles.selected
                        : null,
                ]}>
                <Text
                    style={[
                        styles.text,
                        value === TimeSwitchValues.fromStart
                            ? { color: '#000' }
                            : null,
                    ]}>
                    {strings.FromStart}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onChange(TimeSwitchValues.fromEnd)}
                style={[
                    styles.button,
                    value === TimeSwitchValues.fromEnd ? styles.selected : null,
                ]}>
                <Text
                    style={[
                        styles.text,
                        value === TimeSwitchValues.fromEnd
                            ? { color: '#000' }
                            : null,
                    ]}>
                    {strings.FromEnd}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 17,
        color: secondaryGrey,
    },
})
