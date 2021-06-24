import React, { FC, useState, useEffect } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign'
import {
    borderGrey,
    secondaryGrey,
    defaultStyles,
    placeholderGrey,
} from '../constants'

export type DropDownProps = {
    open: boolean
    maxLines?: number
    value: string
    placeholder: string
    onChange: (value: string) => void
    options: string[]
}

export const DropDownInput: FC<DropDownProps> = ({
    open = false,
    maxLines = 5,
    value,
    placeholder,
    options = [],
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open)
    const [filteredList, setFilteredList] = useState<string[]>(options)
    const [inputValue, setInputValue] = useState<string>(value)

    const onTextChange = (value: string) => {
        filterList(value)
        setInputValue(value)
    }

    const onSubmit = () => {
        if (filteredList[0]) {
            let value = filteredList[0]
            setInputValue(value)
            setIsOpen(false)
        } else {
            setIsOpen(false)
        }
    }

    const clear = () => {
        filterList('')
        setInputValue('')
    }

    const filterList = (value: string = '') => {
        const list: string[] = options.filter(e => {
            if (!e) return false
            return e.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredList(list)
        setIsOpen(!!list?.length)
    }

    let popUpHeight = 200
    if (filteredList.length < maxLines) popUpHeight = filteredList.length * 40
    else popUpHeight = maxLines * 40

    const popUpRender = () => {
        return [
            filteredList?.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(false)
                            Keyboard.dismiss()
                            setInputValue(el)
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{el}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    useEffect(() => {
        if (options.length && !filterList.length) {
            setFilteredList(options)
            if (open) setIsOpen(true)
        }
    }, [options])

    useEffect(() => {
        if (!filteredList.length && isOpen) setIsOpen(false)
    }, [isOpen])

    return (
        <View style={styles.container}>
            <View style={defaultStyles.border}>
                <TextInput
                    onSubmitEditing={onSubmit}
                    style={styles.inputText}
                    placeholderTextColor={placeholderGrey}
                    placeholder={placeholder}
                    value={inputValue}
                    onChangeText={onTextChange}
                />
                {!!inputValue && (
                    <IconAnt
                        style={styles.iconClear}
                        name="close"
                        size={22.5}
                        onPress={clear}
                        color={placeholderGrey}
                    />
                )}
                {filteredList.length > 0 && (
                    <Icon
                        style={styles.iconDown}
                        name={isOpen ? 'angle-up' : 'angle-down'}
                        size={30}
                        onPress={() => setIsOpen(v => !v)}
                        color={isOpen ? '#aaa' : placeholderGrey}
                    />
                )}
            </View>
            {isOpen && (
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={[styles.popUp, { height: popUpHeight }]}>
                    {popUpRender()}
                </ScrollView>
            )}
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    inputText: {
        fontSize: 17,
        width: '100%',
        flex: 1,
        flexShrink: 0,
    },
    iconDown: {
        paddingTop: 10,
        height: 50,
        width: 30,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
    iconClear: {
        paddingTop: 14,
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
