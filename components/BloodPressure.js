import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'
import { strings } from '../localizations'

export default class BloodPressure extends Component {
    state = {
        before: ['', ''],
        after: ['', ''],
    }

    componentDidMount() {
        this.setState({
            before: this.props.values.before || '',
            after: this.props.values.after || '',
        })
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.Text}>
                        {strings.BloodPressure} {strings.before}:
                    </Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        value={this.state.before[0]}
                        maxLength={3}
                        onSubmitEditing={() => this.input2.focus()}
                        ref={input => {
                            this.input1 = input
                        }}
                        onChangeText={value => {
                            this.setState(
                                {
                                    before: [value, this.state.before[1]],
                                },
                                () => {
                                    this.props.callback(this.state)
                                },
                            )
                        }}
                    />
                    <Text style={styles.Spacer}>{'/'}</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        value={this.state.before[1]}
                        maxLength={3}
                        onSubmitEditing={() => this.input3.focus()}
                        ref={input => {
                            this.input2 = input
                        }}
                        onChangeText={value => {
                            this.setState(
                                {
                                    before: [this.state.before[0], value],
                                },
                                () => {
                                    this.props.callback(this.state)
                                },
                            )
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.Text}>
                        {strings.BloodPressure} {strings.after}:
                    </Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        value={this.state.after[0]}
                        maxLength={3}
                        onSubmitEditing={() => this.input4.focus()}
                        ref={input => {
                            this.input3 = input
                        }}
                        onChangeText={value => {
                            this.setState(
                                {
                                    after: [value, this.state.after[1]],
                                },
                                () => {
                                    this.props.callback(this.state)
                                },
                            )
                        }}
                    />
                    <Text style={styles.Spacer}>{'/'}</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.TextInputStyle}
                        keyboardType={'numeric'}
                        value={this.state.after[1]}
                        maxLength={3}
                        ref={input => {
                            this.input4 = input
                        }}
                        onChangeText={value => {
                            this.setState(
                                {
                                    after: [this.state.after[0], value],
                                },
                                () => {
                                    this.props.callback(this.state)
                                },
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    Title: {
        lineHeight: 50,
        fontSize: 17,
        textAlign: 'center',
    },
    TextInputStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        fontSize: 17,
        width: 58,
    },
    Text: {
        flex: 1,
        top: 13,
        left: 10,
        fontSize: 17,
    },
    Spacer: {
        top: 13,
        fontSize: 17,
        marginLeft: 10,
        marginRight: 10,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
})
