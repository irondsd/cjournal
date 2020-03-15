import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Complaints
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#8c41a3"
                shadeColor="#000"
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
