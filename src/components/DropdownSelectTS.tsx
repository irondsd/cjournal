import React, { FC, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { placeholderGrey, defaultStyles } from '../constants'
import { DropDownProps, styles } from './DropDownInputTS'

export const DropDownInput: FC<DropDownProps> = ({
    open = false,
    maxLines = 5,
    value,
    placeholder,
    options = [],
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open)

    const popUpRender = () => {
        return [
            options.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(false)
                            onChange(el)
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{el}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    const popUpHeight = maxLines * 40

    return (
        <View style={styles.View}>
            <TouchableOpacity
                activeOpacity={1}
                style={defaultStyles.border}
                onPress={() => setIsOpen(v => !v)}>
                {value === '' && (
                    <Text style={styles.placeholder}>{placeholder}</Text>
                )}
                <Text style={styles.inputText}>{value}</Text>
            </TouchableOpacity>
            <Icon
                style={styles.iconDown}
                name={isOpen ? 'angle-up' : 'angle-down'}
                size={30}
                onPress={() => setIsOpen(v => !v)}
                color={isOpen ? '#aaa' : placeholderGrey}
            />
            {isOpen && (
                <ScrollView
                    style={[
                        styles.popUp,
                        {
                            height: popUpHeight,
                        },
                    ]}>
                    {popUpRender()}
                </ScrollView>
            )}
        </View>
    )
}
