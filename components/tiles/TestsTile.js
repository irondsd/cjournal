import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.Tests
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color='#6d1393'
                disabled={this.props.disabled}
                imgScale={0.8}
                onPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
            />
        )
    }
}
