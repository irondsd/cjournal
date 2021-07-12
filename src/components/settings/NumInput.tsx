import React, { FC } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { borderGrey } from '../../constants'

type NumInputProps = {
    title: string
    value: number
    onChange: (n: number) => void
}

export const NumInput: FC<NumInputProps> = ({ title, value, onChange }) => {
    return (
        <View style={styles.View}>
            <Text style={styles.Text}>{title}</Text>
            <View style={styles.border}>
                <TextInput
                    onChangeText={v => onChange(parseInt(v))}
                    style={styles.Input}
                    value={`${value}`}
                    keyboardType={'numeric'}
                    selectTextOnFocus
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    border: {
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: borderGrey,
    },
    Input: {
        fontSize: 17,
    },
})
