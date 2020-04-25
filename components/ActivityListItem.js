import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { iconPicker } from '../helpers/iconPicker'
import { paths, editable, activityTypes } from '../constants'
import ListItem from './ListItem'

export default class ActivityListItem extends Component {
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
        }

        return data
    }

    hasComment() {
        return !!this.props.item.comment
    }

    hasAudio() {
        return !!this.props.item.data.audio || !!this.props.item.data.audioFile
    }

    hasPhoto() {
        return !!this.props.item.data.image || !!this.props.item.data.photoFile
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

    isSynced() {
        return (
            this.props.item.data.system &&
            (this.props.item.data.awaitsSync || this.props.item.data.awaitsEdit)
        )
    }

    render() {
        return (
            <ListItem
                activity_type={this.props.item.activity_type}
                time={this.time()}
                data={this.data()}
                synced={this.isSynced()}
                comment={this.hasComment()}
                audio={this.hasAudio()}
                photo={this.hasPhoto()}
                // disabled={!editable.includes(this.props.item.activity_type)}
                onPress={() => this.onPress()}
            />
        )
    }
}
