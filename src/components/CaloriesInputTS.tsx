import React, { FC } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { borderGrey, placeholderGrey } from '../constants'
import { strings } from '../localization'

type CaloriesInputProps = {
    value: number
    onChange: (value: number) => void
}

export const CaloriesInput: FC<CaloriesInputProps> = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>{strings.Calories}:</Text>
            <TextInput
                underlineColorAndroid="transparent"
                style={styles.TextInputStyle}
                keyboardType={'numeric'}
                value={value ? `${value}` : undefined}
                onChangeText={v => onChange(parseInt(v))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    TextInputStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        fontSize: 17,
        flex: 1,
    },
    Text: {
        flex: 1,
        top: 13,
        left: 10,
        fontSize: 17,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
})
