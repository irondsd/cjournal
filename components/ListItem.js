import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { iconPicker } from '../helpers/iconPicker'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListItem extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.props.onPress()}>
                <Image
                    style={styles.img}
                    source={iconPicker(this.props.activity_type)}
                />
                <Text style={styles.title}>
                    {strings[this.props.activity_type] ||
                        strings.UnknownActivity}
                </Text>
                <Text style={styles.subtitle}>
                    {this.props.time}
                    {this.props.data ? ' - ' + this.props.data : null}
                </Text>
                {this.props.synced === false ? (
                    <Icon
                        style={styles.synced}
                        name="repeat"
                        color="#EEE"
                        size={30}
                    />
                ) : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        left: 20,
    },
    title: {
        left: 45,
        fontSize: 20,
        textAlign: 'left',
        color: 'black',
    },
    subtitle: {
        left: 45,
        fontSize: 13,
        textAlign: 'left',
        color: 'grey',
    },
    img: {
        top: 5,
        position: 'absolute',
        width: 40,
        height: 40,
        tintColor: 'black',
    },
    synced: {
        position: 'absolute',
        right: 50,
        top: 10,
    },
})
