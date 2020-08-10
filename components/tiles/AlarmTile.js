import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import Activity from '../../classes/Activity'

const name = activityTypes.Alarm

export default class AlarmTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={name}
                navigation={this.props.navigation}
                color="#b51515"
                shadeColor="#b51515"
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
