import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import RunningTile from '../../components/tiles/RunningTile'
import GymWalkingTile from '../../components/tiles/GymWalkingTile'
import BicyclingTile from '../../components/tiles/BicyclingTile'

class GymScreen extends Component {
    static navigationOptions = {
        title: strings.Gym,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <GymWalkingTile navigation={this.props.navigation} />
                <RunningTile navigation={this.props.navigation} />
                <BicyclingTile navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(GymScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    activityBox: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
    },
})
