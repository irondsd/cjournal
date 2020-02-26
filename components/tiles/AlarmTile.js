import React, { Component } from 'react'
import ActivityLargeItem from '../ActivityLargeItem'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Alarm
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityLargeItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#D00"
                imgScale={0.85}
                onPress={() => {
                    this.props.navigation.navigate(paths.Alarm, {
                        longPress: false,
                    })
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Alarm, {
                        longPress: true,
                    })
                }}
            />
        )
    }
}
