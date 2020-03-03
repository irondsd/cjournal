import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import IconAnt from 'react-native-vector-icons/dist/AntDesign'
import {
    borderGrey,
    secondaryGrey,
    placeholderGrey,
    defaultStyles,
} from '../constants'

const ref_input = React.createRef()

export default class DropDownInput extends Component {
    state = {
        text: '',
        droppedDown: false,
        refinedList: [],
        maxLines: 5,
        list: [],
    }

    componentDidMount() {
        this.setState({
            droppedDown: this.props.open,
            refinedList: this.props.list,
            text: this.props.value ? this.props.value : '',
            maxLines: this.props.maxLines || 5,
            list: this.props.list,
        })

        if (this.props.list.length === 0) this.setState({ droppedDown: false })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.list !== prevState.list) {
            return {
                refinedList: nextProps.list,
                droppedDown:
                    nextProps.list.length === 0 ? false : nextProps.open,
                list: nextProps.list,
            }
        } else return null
    }

    onSubmitEditing = () => {
        if (this.state.refinedList[0]) {
            let value = this.state.refinedList[0]
            this.setState({ text: value, droppedDown: false })
        } else {
            this.setState({ droppedDown: false })
        }
    }

    clear = () => {
        this.onChangeText('')
        this.refineList('')
    }

    refineList = value => {
        let list = this.props.list
        list = list.filter(e => {
            return e.toLowerCase().includes(value.toLowerCase())
        })
        this.setState({
            refinedList: list,
            droppedDown: list.length > 0 ? true : false,
        })
    }

    onChangeText = value => {
        this.refineList(value)
        this.setState({
            text: value,
        })

        this.props.onChangeText(value)
    }

    dropDown = () => {
        if (this.state.refinedList.length > 0) {
            this.setState({
                droppedDown: !this.state.droppedDown,
            })
        }
        // ref_input.current.focus()
    }

    popUpRender = () => {
        let array = this.state.refinedList
        return [
            array.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.onChangeText(el)
                            this.setState({ droppedDown: false })
                            Keyboard.dismiss()
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

        if (this.state.refinedList.length < this.state.maxLines)
            popUpHeight = this.state.refinedList.length * 40
        else popUpHeight = this.state.maxLines * 40

        return (
            <View style={styles.View}>
                <View style={defaultStyles.border}>
                    <TextInput
                        onSubmitEditing={this.onSubmitEditing}
                        style={styles.inputText}
                        placeholderTextColor={placeholderGrey}
                        placeholder={this.props.placeholder}
                        value={this.state.text}
                        onChangeText={this.onChangeText}
                        ref={ref_input}
                    />
                    {this.state.text !== '' && (
                        <IconAnt
                            style={styles.iconClear}
                            name="close"
                            size={22.5}
                            onPress={this.clear}
                            color={placeholderGrey}
                        />
                    )}
                    {this.state.refinedList.length > 0 && (
                        <Icon
                            style={styles.iconDown}
                            name={
                                this.state.droppedDown
                                    ? 'angle-up'
                                    : 'angle-down'
                            }
                            size={30}
                            onPress={this.dropDown}
                            color={
                                this.state.droppedDown
                                    ? '#aaa'
                                    : placeholderGrey
                            }
                        />
                    )}
                </View>
                {this.state.droppedDown && (
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        style={[styles.popUp, { height: popUpHeight }]}>
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
    iconClear: {
        paddingTop: 14,
        height: 50,
        width: 30,
    },
    popUp: {
        position: 'absolute',
        zIndex: 10,
        top: 49,
        bottom: 0,
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 30,
        backgroundColor: 'white',
    },
    popUpText: {
        fontSize: 17,
        lineHeight: 40,
        color: secondaryGrey,
    },
})
