import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.Weakness
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#458065"
                imgScale={0.8}
                onPress={() => {
                    this.props.navigation.navigate(paths.Weakness)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Weakness)
                }}
            />
        )
    }
}
