import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Service
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#32252C"
                disabled={this.props.disabled}
                imgScale={0.85}
                onPress={() => {
                    this.props.navigation.navigate(paths.Service)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Service)
                }}
            />
        )
    }
}
