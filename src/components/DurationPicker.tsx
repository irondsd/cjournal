import React, { FC, useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { durations } from '../constants'
import { strings } from '../localization'
import { localTime } from '../helpers/dateTime'
import { sortNumbers } from '../helpers/sort'
import Icon from 'react-native-vector-icons/FontAwesome'
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'

interface DurationPickerProps {
    value: number
    onChange: (value: number) => void
    open?: boolean
    maxLines?: number
}

export const DurationPicker: FC<DurationPickerProps> = ({
    value,
    onChange,
    open = false,
    maxLines = 5,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open)
    const [durationsList, setDurationsList] = useState<number[]>([...durations])

    useEffect(() => {
        if (!durationsList.includes(value)) {
            setDurationsList(sortNumbers([...durationsList, value]))
        }
    }, [value, durationsList])

    const popUpRender = () => {
        return [
            durationsList.map(duration => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            onChange(duration)
                            setIsOpen(false)
                        }}
                        key={duration}>
                        <Text style={styles.popUpText}>
                            {localTime(duration)}
                        </Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    const popUpHeight =
        maxLines > durationsList.length ? durationsList.length * 40 : 200

    return (
        <View style={styles.container}>
            <View style={styles.duration}>
                <Text style={styles.text}>{`${strings['Duration']}: `}</Text>
            </View>
            <View style={styles.select}>
                <TouchableOpacity
                    activeOpacity={100}
                    style={styles.input}
                    onPress={() => setIsOpen(!isOpen)}>
                    {value === undefined ? (
                        <Text style={styles.placeholder}>
                            {strings.NotSelected}
                        </Text>
                    ) : (
                        <Text style={styles.Text}>{localTime(value)}</Text>
                    )}
                </TouchableOpacity>
                <Icon
                    style={styles.iconDown}
                    name={isOpen ? 'angle-up' : 'angle-down'}
                    size={30}
                    onPress={() => setIsOpen(!isOpen)}
                    color={isOpen ? '#aaa' : placeholderGrey}
                />
                {isOpen && (
                    <ScrollView style={[styles.popUp, { height: popUpHeight }]}>
                        {popUpRender()}
                        {/* <TouchableOpacity
                            onPress={() => console.log('ggg')}
                            style={{
                                backgroundColor: 'red',
                                flex: 1,
                                height: 100,
                            }}></TouchableOpacity> */}
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    duration: {
        width: '45%',
    },
    text: {
        fontSize: 17,
        height: 50,
        lineHeight: 50,
        textAlignVertical: 'center',
    },
    select: {
        width: '55%',
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
    },
    Text: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: '#000',
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
    iconDown: {
        position: 'absolute',
        right: 0,
        top: 10,
        height: 50,
        width: 30,
    },
    popUp: {
        position: 'absolute',
        zIndex: 100,
        top: 49,
        bottom: 0,
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    popUpText: {
        fontSize: 17,
        lineHeight: 40,
        color: secondaryGrey,
    },
})
