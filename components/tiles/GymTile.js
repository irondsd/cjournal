import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'
import { activityInstantSave } from '../../helpers/activityInstantSave'

const name = activity_types.Gym

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
                    activityInstantSave(name)
                    this.props.navigation.navigate(paths.Home)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.TimePick, {
                        sender: name,
                    })
                }}
            />
        )
    }
}