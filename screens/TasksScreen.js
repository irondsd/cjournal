import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor } from '../properties'
import { strings } from '../localizations'
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
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.fetch)
        this.intervalId = setInterval(() => {
            this.fetch()
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    fetch() {
        id = this.props.user.id
        api_key = this.props.user.api_key
        this.props.fetchData(id, api_key)
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
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (id, api_key) => {
        dispatch(tasksFetchData(id, api_key))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        paddingBottom: 25,
    },
    list: {
        flex: 1,
        top: 20,
    },
})
