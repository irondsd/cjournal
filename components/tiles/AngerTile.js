import React, { Component } from 'react'
import ActivityItem from '../../ActivityItem'
import { strings } from '../../../localizations'
import { activityInstantSave } from '../../../helpers/activityInstantSave'
import { activity_types, paths } from '../../../properties'

const name = activity_types.Anger
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={require('../../../resources/icons/quarrel.png')}
                navigation={this.props.navigation}
                color='#ad0000'
                imgScale={0.8}
                onPress={() => {
                    activityInstantSave(name)
                    this.props.navigation.navigate(paths.Home)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.TimePick, { sender: name })
                }}
            />
        )
    }
}
