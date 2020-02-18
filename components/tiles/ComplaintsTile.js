import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.Complaints
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#C62828"
                shadeColor="#384E77"
                imgScale={1}
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