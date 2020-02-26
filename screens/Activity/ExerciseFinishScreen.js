import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatListView,
    BackHandler,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor } from '../../constants'
import { strings } from '../../localizations'
import { updateActivity } from '../../redux/actions'
import { paths } from '../../constants'

class FinishScreen extends Component {
    static navigationOptions = {
        title: strings.ExerciseFinish,
        headerLeft: null,
    }

    state = {
        activity: {
            data: {
                steps: 0,
                distance: 0,
                state: 'Normal',
            },
        },
        message: strings.ExerciseFinishText,
        stats: '',
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        this.setState({
            activity: this.props.navigation.state.params.activity,
            stats:
                this.props.navigation.state.params.activity.activity_type ==
                'Walking'
                    ? `${strings.Steps}: ${this.props.navigation.state.params.activity.data.steps}, ${strings.Distance}: ${this.props.navigation.state.params.activity.data.distance} ${strings.Meters}`
                    : `${strings.Meters}: ${this.props.navigation.state.params.activity.data.meters}`,
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
    }

    handleBackButton() {
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.message}</Text>
                <Text style={styles.text}>{this.state.stats}</Text>
                <Text style={styles.text}>{strings.HowDoYouFeelAfterThis}</Text>
                <View style={styles.feelingsBox}>
                    <TouchableOpacity
                        onPress={() => {
                            activity = this.state.activity
                            activity.data.state = 'Bad'
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <Image
                            style={styles.img}
                            source={require('../../resources/icons/bad.png')}
                        />
                        <Text style={styles.text}>{strings.Bad}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            activity = this.state.activity
                            activity.data.state = 'Normal'
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <Image
                            style={styles.img}
                            source={require('../../resources/icons/mood.png')}
                        />
                        <Text style={styles.text}>{strings.Normal}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            activity = this.state.activity
                            activity.data.state = 'Good'
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <Image
                            style={styles.img}
                            source={require('../../resources/icons/happy.png')}
                        />
                        <Text style={styles.text}>{strings.Good}</Text>
                    </TouchableOpacity>
                </View>
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

const mapDispatchToProps = dispatch => ({
    update: (originalActivity, updatedActivity) => {
        dispatch(updateActivity(originalActivity, updatedActivity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FinishScreen)

const imgSize = Dimensions.get('window').width / 3.75

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    feelingsBox: {
        top: 100,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: imgSize,
        height: imgSize,
        margin: 10,
        tintColor: 'grey',
    },
})
