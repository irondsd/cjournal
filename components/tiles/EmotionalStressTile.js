import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.EmotionalStress
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#134756"
                shadeColor="#3214a8"
                imgScale={0.9}
                onPress={() => {
                    this.props.navigation.navigate(paths.EmotionalStress)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.EmotionalStress)
                }}
            />
        )
    }
}
