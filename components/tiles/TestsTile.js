import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Tests

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#57687a"
                shadeColor="#5d577a"
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
            />
        )
    }
}
