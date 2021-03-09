import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import Activity from '../../classes/Activity'
import { activityTypes, paths } from '../../constants'

const name = activityTypes.Syncope

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={name}
                navigation={this.props.navigation}
                shadeColor="#b3caeb"
                color="#3e77cc"
                onPress={() => {
                    Activity.instantInitSave(
                        name,
                        this.props.navigation.navigate,
                    )
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
