import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import DyspneaTile from '../../components/tiles/DyspneaTile'
import TachypneaTile from '../../components/tiles/TachypneaTile'
import ArrhythmiaTile from '../../components/tiles/ArrhythmiaTile'
import PalpitationTile from '../../components/tiles/PalpitationTile'
import OtherComplaints from '../../components/tiles/OtherComplaints'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'

export default class ComplaintsScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Complaints,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <ArrhythmiaTile navigation={this.props.navigation} />
                    <PalpitationTile navigation={this.props.navigation} />
                    <DyspneaTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <TachypneaTile navigation={this.props.navigation} />
                    <OtherComplaints navigation={this.props.navigation} />
                    <TileSpacer />
                </TileWrapper>
            </View>
        )
    }
}
