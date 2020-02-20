import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

let maxLines = 5

export default class DropDownSelect extends Component {
    state = {
        value: '',
        droppedDown: false,
        list: [],
    }

    componentDidMount() {
        this.setState({
            droppedDown: this.props.open,
            list: this.props.list,
            value: this.props.value ? this.props.value : '',
        })
        if (this.props.maxLines) maxLines = this.props.maxLines
    }

    onSelect = value => {
        this.setState({
            value: value,
            droppedDown: true,
        })

        this.props.onSelect(value)
    }

    dropDown = () => {
        this.setState({
            droppedDown: !this.state.droppedDown,
        })
    }

    popUpRender = () => {
        let array = this.state.list
        return [
            array.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.onSelect(el)
                            this.setState({ droppedDown: false })
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{el}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    render() {
        let popUpHeight = 200

        if (this.state.list.length < maxLines)
            popUpHeight = this.state.list.length * 40

        return (
            <View style={styles.View}>
                <TouchableOpacity
                    activeOpacity={100}
                    style={styles.input}
                    onPress={this.dropDown}>
                    {this.state.value === '' && (
                        <Text style={styles.placeholder}></Text>
                    )}
                    <Text style={styles.Text}>{this.state.value}</Text>
                </TouchableOpacity>
                <Icon
                    style={styles.iconDown}
                    name={this.state.droppedDown ? 'angle-up' : 'angle-down'}
                    size={30}
                    onPress={this.dropDown}
                    color={this.state.droppedDown ? '#aaa' : '#ddd'}
                />
                {this.state.droppedDown && (
                    <ScrollView style={[styles.popUp, { height: popUpHeight }]}>
                        {this.popUpRender()}
                    </ScrollView>
                )}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    View: {
        // backgroundColor: 'white',
        width: '100%',
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
    },
    Text: {
        flex: 1,
        top: 13,
        fontSize: 17,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: '#ddd',
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
        top: 49,
        bottom: 0,
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    popUpText: {
        fontSize: 17,
        lineHeight: 40,
        color: '#888',
    },
})
