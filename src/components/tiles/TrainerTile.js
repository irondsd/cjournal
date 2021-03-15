import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'

const name = activityTypes.Trainer

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
                    this.props.navigation.navigate(paths.Trainer)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Trainer)
                }}
            />
        )
    }
}