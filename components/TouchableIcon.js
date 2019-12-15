import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { withNavigation } from 'react-navigation'

export default class TouchableIcon extends Component {
    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.props.onPress}>
                <Icon
                    name={this.props.name}
                    color="#FFF"
                    size={this.props.size}
                />
            </TouchableOpacity>
        )
    }
}

TouchableIcon.defaultProps = {
    size: 30,
}
