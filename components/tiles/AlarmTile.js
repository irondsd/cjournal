import React, { Component } from 'react'
import ActivityLargeItem from '../ActivityLargeItem'
import { strings } from '../../localizations'
import { activityAlarmSave } from '../../helpers/activityAlarmSave'
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
                color="#a00"
                shadeColor="#000"
                imgScale={0.85}
                onPress={() => {
                    activityAlarmSave(name)
                    this.props.navigation.navigate(paths.Home)
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
