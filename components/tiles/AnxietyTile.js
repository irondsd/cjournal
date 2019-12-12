import React, { Component } from 'react'
import ActivityItem from '../../ActivityItem'
import { strings } from '../../../localizations'
import { activityInstantSave } from '../../../helpers/activityInstantSave'
import { activity_types, paths } from '../../../properties'

const name = activity_types.Anxiety
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={require('../../../resources/icons/anxiety.png')}
                navigation={this.props.navigation}
                color='#421000'
                imgScale={1}
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
