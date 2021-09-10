import React, { FC, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TextInput, Text, TextInputProps } from 'react-native'
import { borderGrey, placeholderGrey } from '../constants'
import { strings } from '../localization'

export type BloodPressureValues = {
    before: [number | undefined, number | undefined]
    after: [number | undefined, number | undefined]
}

type BloodPressureProps = {
    values: BloodPressureValues
    onChange: (values: BloodPressureValues) => void
}

const defaultValues: BloodPressureValues = {
    before: [undefined, undefined],
    after: [undefined, undefined],
}

export const BloodPressure: FC<BloodPressureProps> = ({
    values = defaultValues,
    onChange,
}) => {
    const [before, setBefore] = useState(values.before)
    const [after, setAfter] = useState(values.after)

    const beforeRef1 = useRef<TextInput>(null)
    const beforeRef2 = useRef<TextInput>(null)
    const afterRef1 = useRef<TextInput>(null)
    const afterRef2 = useRef<TextInput>(null)

    useEffect(() => {
        onChange({ before, after })
    }, [before, after])

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.Text}>
                    {strings.BloodPressure} {strings.before}:
                </Text>
                <TextInput
                    {...inputProps}
                    value={before?.[0] ? `${before?.[0]}` : undefined}
                    ref={beforeRef1}
                    onSubmitEditing={() => {
                        if (beforeRef2.current) beforeRef2.current.focus()
                    }}
                    onChangeText={value =>
                        setBefore(prev => [parseInt(value), prev?.[1]])
                    }
                />
                <Text style={styles.Spacer}>{'/'}</Text>
                <TextInput
                    {...inputProps}
                    value={before?.[1] ? `${before?.[1]}` : undefined}
                    ref={beforeRef2}
                    onSubmitEditing={() => {
                        if (afterRef1.current) afterRef1.current.focus()
                    }}
                    onChangeText={value =>
                        setBefore(prev => [prev?.[0], parseInt(value)])
                    }
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.Text}>
                    {strings.BloodPressure} {strings.after}:
                </Text>
                <TextInput
                    {...inputProps}
                    value={after?.[0] ? `${after?.[0]}` : undefined}
                    onSubmitEditing={() => {
                        if (afterRef2.current) afterRef2.current.focus()
                    }}
                    ref={afterRef1}
                    onChangeText={value =>
                        setAfter(prev => [parseInt(value), prev?.[1]])
                    }
                />
                <Text style={styles.Spacer}>{'/'}</Text>
                <TextInput
                    {...inputProps}
                    value={after?.[1] ? `${after?.[1]}` : undefined}
                    ref={afterRef2}
                    onChangeText={value =>
                        setAfter(prev => [prev?.[0], parseInt(value)])
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    Title: {
        lineHeight: 50,
        fontSize: 17,
        textAlign: 'center',
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
        width: 58,
    },
    Text: {
        flex: 1,
        top: 13,
        left: 10,
        fontSize: 17,
    },
    Spacer: {
        top: 13,
        fontSize: 17,
        marginLeft: 10,
        marginRight: 10,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
})

const inputProps: TextInputProps = {
    underlineColorAndroid: 'transparent',
    style: styles.TextInputStyle,
    keyboardType: 'numeric',
    maxLength: 3,
}
