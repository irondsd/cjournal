import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Linking, Platform } from 'react-native'
import { defaultStyles } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class OpenInMaps extends Component {
    open = () => {
        console.log(this.props.coords)

        let coords = this.props.coords[0]

        const url = Platform.select({
            // https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324
            ios:
                'maps:' + coords.latitude + ',' + coords.longitude + 'q=начало',
            android:
                'geo:' + coords.latitude + ',' + coords.longitude + 'q=начало',
        })
        Linking.openURL(url)
    }
    render() {
        return (
            <TouchableOpacity
                style={[
                    defaultStyles.border,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
                onPress={() => {
                    this.open()
                }}>
                <Icon name={'google'} color={'#000'} size={25} />
                <Text style={{ fontSize: 22 }}> Open in Google maps </Text>
            </TouchableOpacity>
        )
    }
}
