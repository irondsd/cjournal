import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import MassageTile from '../../components/tiles/MassageTile'
import PhysiotherapyTile from '../../components/tiles/PhysiotherapyTile'
import Sunbathe from '../../components/tiles/Sunbathe'

type Props = {}
class IntakeScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Influence,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <MassageTile navigation={this.props.navigation} />
                <PhysiotherapyTile navigation={this.props.navigation} />
                <Sunbathe navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(IntakeScreen)

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
