import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import {
    backgroundColor,
    paths,
    activityTypes,
    defaultStyles,
    borderGrey,
    placeholderGrey,
    secondaryGrey,
} from '../constants'
import { strings } from '../localizations'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DeviceIdInput extends Component {
    render() {
        return (
            <View>
                <View style={styles.inputBlock}>
                    <TextInput
                        placeholder={strings.DeviceId}
                        multiline={false}
                        maxLength={80}
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={true}
                        returnKeyType="next"
                        onChangeText={text => {
                            this.props.setText(text)
                        }}
                        value={this.props.device_id}
                    />
                    <View style={styles.icon}>
                        <Icon
                            name={'qrcode'}
                            size={30}
                            color={secondaryGrey}
                            onPress={() => {
                                this.onOpneScanner()
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBlock: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        flex: 1,
        paddingRight: 15,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        fontSize: 17,
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
