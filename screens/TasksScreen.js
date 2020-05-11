import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../constants'
import { strings } from '../localization'
import { tasksFetchData } from '../requests/tasksFetchData'
import TasksListItem from '../components/TasksListItem'
import store from '../redux/store'

type Props = {}
class TasksScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Tasks,
    }

    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
        store.subscribe(() => {
            this.forceUpdate()
        })

        this.active = false
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.fetch()
            this.active = true
        })
        this.props.navigation.addListener('willBlur', () => {
            this.active = false
        })

        this.updates()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    updates() {
        this.intervalId = setInterval(() => {
            if (this.active) {
                this.fetch()
            }
        }, listUpdateInterval)
    }

    fetch() {
        let id = this.props.user.id
        let tokens = this.props.tokens
        this.props.fetchData(id, tokens.access_token)
    }

    _renderItem = ({ item, index }) => {
        return <TasksListItem item={item} navigation={this.props.navigation} />
    }

    render() {
        this.props.tasks ? (list = [...this.props.tasks]) : (list = [])
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <FlatList
                    style={styles.list}
                    data={list}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    overScrollMode={'always'}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        tasks: state.tasks,
        tokens: state.tokens,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (id, access_token) => {
        dispatch(tasksFetchData(id, access_token))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TasksScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    list: {
        flex: 1,
        paddingTop: 10,
        flexGrow: 1,
        paddingBottom: 20,
    },
})
