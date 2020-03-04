import React, { Component } from 'react'
import { Text, View, Switch, StyleSheet, Platform } from 'react-native'
import { secondaryColor, placeholderGrey, secondaryGrey } from '../../constants'

export default class IdinvFilter extends Component {
    render() {
        return (
            <View style={styles.View}>
                <Text style={styles.Text}>{this.props.text}</Text>
                <Switch
                    onChange={this.props.onChange}
                    value={this.props.value}
                    trackColor={{
                        true: placeholderGrey,
                        false: Platform.OS == 'android' ? '#d3d3d3' : '#fbfbfb',
                    }}
                    thumbColor={[
                        Platform.OS == 'ios'
                            ? '#fff'
                            : this.props.value
                            ? secondaryColor
                            : '#fff',
                    ]}
                    ios_backgroundColor="#fbfbfb"
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
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
})
