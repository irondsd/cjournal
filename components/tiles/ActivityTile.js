import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Activity
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#126835"
                shadeColor="#a0f"
                disabled={this.props.disabled}
                imgScale={1.07}
                onPress={() => {
                    this.props.navigation.navigate(paths.Activity)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Activity)
                }}
            />
        )
    }
}
