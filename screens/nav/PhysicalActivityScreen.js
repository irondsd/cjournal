import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import PhysicalWorkTile from '../../components/tiles/PhysicalWorkTile'
import SexTile from '../../components/tiles/SexTile'
import ToiletTile from '../../components/tiles/ToiletTile'
import SaunaTile from '../../components/tiles/SaunaTile'
import ShowerTile from '../../components/tiles/ShowerTile'

type Props = {}
class PhysicalActivityScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <PhysicalWorkTile navigation={this.props.navigation} />
                <SexTile navigation={this.props.navigation} />
                <ToiletTile navigation={this.props.navigation} />
                <SaunaTile navigation={this.props.navigation} />
                <ShowerTile navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(PhysicalActivityScreen)

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
