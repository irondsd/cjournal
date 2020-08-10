import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'

const name = activityTypes.Sleep

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={name}
                navigation={this.props.navigation}
                color="#0642bc"
                shadeColor="#0642bc"
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.Sleep)
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
