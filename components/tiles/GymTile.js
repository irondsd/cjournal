import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'
import { activityInstantSave } from '../../helpers/activityInstantSave'

const name = activityTypes.Gym

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#512DA8"
                imgScale={0.95}
                onPress={() => {
                    this.props.navigation.navigate(paths.Gym)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Gym)
                }}
            />
        )
    }
}
