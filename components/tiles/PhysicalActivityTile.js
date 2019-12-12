import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.PhysicalActivity
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color='#2d1a5b'
                imgScale={0.95}
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.PhysicalActivity)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.PhysicalActivity)
                }}
            />
        )
    }
}
