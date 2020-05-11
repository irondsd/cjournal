import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'
import Activity from '../../classes/Activity'

const name = activityTypes.Alarm

export default class AlarmTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#a00"
                shadeColor="#000"
                onPress={() => {
                    Activity.instantInitWithLocationSave(name)
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
