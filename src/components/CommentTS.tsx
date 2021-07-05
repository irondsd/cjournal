import React, { FC } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { strings } from '../localization'
import { borderGrey, placeholderGrey } from '../constants'

type CommentProps = {
    value: string
    onChange: (value: string) => void
    onEndEditing?: (value: string) => void
}

export const Comment: FC<CommentProps> = ({
    value,
    onChange,
    onEndEditing,
}) => {
    return (
        <TextInput
            placeholder={strings.Comment}
            multiline={false}
            maxLength={80}
            placeholderTextColor={placeholderGrey}
            style={styles.input}
            autoCapitalize="sentences"
            autoCorrect={true}
            returnKeyType="done"
            onChangeText={text => onChange(text)}
            onEndEditing={event => onEndEditing?.(event.nativeEvent.text)}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        fontSize: 17,
        paddingLeft: 15,
        lineHeight: 30,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
})
