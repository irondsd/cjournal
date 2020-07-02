import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatListView,
    BackHandler,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, defaultStyles } from '../../constants'
import { strings } from '../../localization'
import { updateActivity } from '../../redux/actions'
import { paths } from '../../constants'
import FeelingGood from '../../resources/svg/positiveemotions.svg'
import FeelingNormal from '../../resources/svg/normal.svg'
import FeelingBad from '../../resources/svg/negativeemotions.svg'

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
                    ? `${strings.Steps}: ${
                          this.props.navigation.state.params.activity.data.steps
                      }, ${strings.Distance}: ${
                          this.props.navigation.state.params.activity.data
                              .distance
                      } ${strings.Meters}`
                    : `${strings.Meters}: ${
                          this.props.navigation.state.params.activity.data
                              .meters
                      }`,
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
            <View style={defaultStyles.container}>
                <Text style={styles.text}>{this.state.message}</Text>
                <Text style={styles.text}>{this.state.stats}</Text>
                <Text style={styles.text}>{strings.HowDoYouFeelAfterThis}</Text>
                <View style={styles.feelingsBox}>
                    <TouchableOpacity
                        onPress={() => {
                            let activity = this.state.activity
                            activity.data.state = strings.Bad
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <FeelingBad
                            style={styles.img}
                            width={imgSize}
                            height={imgSize}
                            fill={'grey'}
                        />
                        <Text style={styles.text}>{strings.Bad}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let activity = this.state.activity
                            activity.data.state = strings.Normal
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <FeelingNormal
                            style={styles.img}
                            width={imgSize}
                            height={imgSize}
                            fill={'grey'}
                        />
                        <Text style={styles.text}>{strings.Normal}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let activity = this.state.activity
                            activity.data.state = strings.Good
                            this.props.update(this.state.activity, activity)
                            this.props.navigation.navigate(paths.Home)
                        }}>
                        <FeelingGood
                            style={styles.img}
                            width={imgSize}
                            height={imgSize}
                            fill={'grey'}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FinishScreen)

const imgSize = Dimensions.get('window').width / 2.5

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    feelingsBox: {
        top: 100,
        height: '50%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    img: {
        tintColor: 'grey',
        marginLeft: 10,
        marginRight: 10,
    },
})
