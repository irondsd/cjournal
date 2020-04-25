import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { iconPicker } from '../helpers/iconPicker'
import { paths, editable, activityTypes } from '../constants'
import ListItem from './ListItem'

export default class ActivityListItem extends Component {
    constructor(props) {
        super(props)

        this.comment = false
        this.photo = false
        this.audio = false
    }

    time() {
        let time
        time = displayDateTime(new Date(this.props.item.time_started * 1000))
        if (
            this.props.item.time_ended != null &&
            this.props.item.time_ended != 'null' &&
            this.props.item.time_ended != this.props.item.time_started
        ) {
            time +=
                ' — ' +
                displayDateTime(new Date(this.props.item.time_ended * 1000))
        }

        return time
    }

    data() {
        let data = null

        if (this.props.item.data) {
            if (this.props.item.data.pill) {
                data = this.props.item.data.pill
            }

            if (this.props.item.data.type) {
                data = this.props.item.data.type
            }

            if (this.props.item.data.audio || this.props.item.data.audioFile)
                this.audio = true

            if (this.props.item.data.image || this.props.item.data.photoFile)
                this.photo = true

            if (this.props.item.comment) this.comment = true
        }

        return data
    }

    onPress() {
        if (editable.includes(this.props.item.activity_type)) {
            this.props.navigation.navigate(
                paths.ActivityDetails,
                this.props.item,
            )
        } else {
            this.props.navigation.navigate(paths.ActivityStats, this.props.item)
        }
    }

    render() {
        return (
            <ListItem
                activity_type={this.props.item.activity_type}
                time={this.time()}
                data={this.data()}
                synced={this.props.item.synced()}
                comment={this.comment}
                audio={this.audio}
                photo={this.photo}
                // disabled={!editable.includes(this.props.item.activity_type)}
                onPress={() => this.onPress()}
            />
        )
    }
}
