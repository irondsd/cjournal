import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.OtherPain
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#303"
                imgScale={1}
                onPress={() => {
                    this.props.navigation.navigate(paths.Other, {
                        sender: name,
                    })
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Other, {
                        sender: name,
                    })
                }}
            />
        )
    }
}
