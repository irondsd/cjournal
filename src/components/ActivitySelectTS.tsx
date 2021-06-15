import React, { ReactNode, FC, useState } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { strings } from '../localization'
import {
    editable,
    borderGrey,
    secondaryGrey,
    placeholderGrey,
} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

type ActivitySelectProps = {
    value: string
    maxLines?: number
    onChange: (option: string) => void
}

export const ActivitySelect: FC<ActivitySelectProps> = ({
    value,
    maxLines = 10,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const Popup = (options: string[]): ReactNode[] => {
        return [
            options.map((o, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            onChange(o)
                            setIsOpen(false)
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{strings[o]}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    let popUpHeight = 200

    if (editable.length < maxLines) popUpHeight = editable.length * 40

    return (
        <View style={styles.View}>
            <TouchableOpacity
                activeOpacity={100}
                style={styles.input}
                onPress={() => setIsOpen(v => !v)}>
                {value === '' && <Text style={styles.placeholder} />}
                <Text style={styles.Text}>{strings[value]}</Text>
            </TouchableOpacity>
            <Icon
                style={styles.iconDown}
                name={isOpen ? 'angle-up' : 'angle-down'}
                size={30}
                onPress={() => setIsOpen(v => !v)}
                color={isOpen ? '#aaa' : placeholderGrey}
            />
            {isOpen && (
                <ScrollView style={[styles.popUp, { height: popUpHeight }]}>
                    {Popup(editable)}
                </ScrollView>
            )}
        </View>
    )
}

var styles = StyleSheet.create({
    View: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        height: 50,
        paddingRight: 15,
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
        minHeight: 50,
        maxHeight: 70,
        width: 30,
    },
    popUp: {
        zIndex: 10,
        position: 'absolute',
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
