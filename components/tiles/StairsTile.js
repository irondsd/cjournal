import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Stairs

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#4E342E"
                imgScale={1.1}
                onPress={() => {
                    this.props.navigation.navigate(paths.Stairs)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Stairs)
                }}
            />
        )
    }
}
