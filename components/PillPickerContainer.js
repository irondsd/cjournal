import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import PillPicker from './PillPicker'
import { connect } from 'react-redux'
import { strings } from '../localizations'

class PillPickerContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            pill: null,
            text: '',
            input: true,
        }

        this.onTextChange = this.onTextChange.bind(this)
    }

    componentDidMount() {
        let pills = []
        if (this.props.activity_type == 'CourseTherapy')
            pills = this.props.user.course_therapy
        if (this.props.activity_type == 'ReliefOfAttack')
            pills = this.props.user.relief_of_attack
        if (this.props.activity_type == 'OneTimeTakingOfMedicine')
            pills = this.props.user.tests

        if (pills.length == 0) {
            this.setState({
                input: true,
                pill: this.props.pill ? this.props.pill : '',
            })
        }
        this.setState({
            pills: [strings.NotSelected, ...pills],
        })
    }

    onTextChange(itemValue) {
        this.setState({
            pill: itemValue,
        })
        this.props.handler(itemValue)
    }

    onPickerChange = value => {
        this.setState({ input: value === strings.NotSelected ? true : false })

        this.props.handler(value)
    }

    render() {
        if (this.state.input)
            return (
                <View>
                    {this.state.pills.length > 1 ? (
                        <PillPicker
                            pill={this.props.pill}
                            list={this.state.pills}
                            handler={this.onPickerChange}
                        />
                    ) : null}
                    <TextInput
                        placeholder={strings.Drug}
                        multiline={true}
                        maxLength={80}
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={true}
                        returnKeyType="next"
                        onChangeText={this.onTextChange}
                        value={this.state.pill}
                    />
                </View>
            )
        return (
            <PillPicker
                pill={this.props.pill}
                list={this.state.pills}
                handler={this.onPickerChange}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(PillPickerContainer)

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        backgroundColor: 'whitesmoke',
        color: 'black',
        // margin: 20
        padding: 10,
        marginTop: 20,
    },
})
