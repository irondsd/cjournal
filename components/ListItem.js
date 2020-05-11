import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    Dimensions,
} from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localization'
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
                <View>
                    <Text style={styles.title}>
                        {strings[this.props.activity_type] ||
                            strings.UnknownActivity}
                    </Text>
                    <View style={styles.sub}>
                        {this.props.comment && (
                            <Icon
                                style={styles.icon}
                                name="comment"
                                color="#999"
                                size={12}
                            />
                        )}
                        {this.props.photo && (
                            <Icon
                                style={styles.icon}
                                name="camera"
                                color="#999"
                                size={12}
                            />
                        )}
                        {this.props.audio && (
                            <Icon
                                style={styles.icon}
                                name="microphone"
                                color="#999"
                                size={12}
                            />
                        )}
                        <Text style={styles.subtitle}>
                            {this.props.time}
                            {this.props.data ? ' - ' + this.props.data : null}
                        </Text>
                    </View>
                    {this.props.synced === false ? (
                        <Icon
                            style={styles.synced}
                            name="repeat"
                            color="#eee"
                            size={30}
                        />
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        color: 'black',
        width: width - 50,
    },
    sub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'left',
        color: 'grey',
    },
    img: {
        alignSelf: 'center',
        width: 40,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        tintColor: 'black',
    },
    synced: {
        position: 'absolute',
        right: 50,
        top: 10,
    },
    icon: {
        marginLeft: 3,
        marginRight: 3,
    },
})
