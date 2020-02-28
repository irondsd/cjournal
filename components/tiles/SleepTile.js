import React, { Component } from 'react'
import ActivityLargeItem from '../ActivityLargeItem'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Sleep

export default class Tile extends Component {
    render() {
        return (
            <ActivityLargeItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#000"
                shadeColor="#660"
                imgScale={0.8}
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
