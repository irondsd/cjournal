import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Complaints

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#d4a900"
                shadeColor="#8c0103"
                onPress={() => {
                    this.props.navigation.navigate(paths.Complaints)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Complaints)
                }}
            />
        )
    }
}
