import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activityTypes } from '../../constants'
import { strings } from '../../localization'
import TileWrapper from '../../components/TileWrapper'
import SexTile from '../../components/tiles/SexTile'
import TileSpacer from '../../components/TileSpacer'
import ToiletTile from '../../components/tiles/ToiletTile'
import ShowerTile from '../../components/tiles/ShowerTile'
import OtherActivity from '../../components/tiles/OtherActivity'
import AlcoholTile from '../../components/tiles/AlcoholTile'
import MealTile from '../../components/tiles/MealTile'
import SmokingTile from '../../components/tiles/SmokingTile'

class ActivityScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <MealTile navigation={this.props.navigation} />
                    <AlcoholTile navigation={this.props.navigation} />
                    <SmokingTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <SexTile navigation={this.props.navigation} />
                    <ShowerTile navigation={this.props.navigation} />
                    <ToiletTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <TileSpacer />
                    <OtherActivity navigation={this.props.navigation} />
                    <TileSpacer />
                </TileWrapper>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        activity: state.activity,
    }
}

export default connect(
    mapStateToProps,
    null,
)(ActivityScreen)
