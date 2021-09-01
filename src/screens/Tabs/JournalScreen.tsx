import React, { FC, useState, useEffect, useMemo } from 'react'
import { StyleSheet, View, FlatList, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../../constants'
import { strings } from '../../localization'
import { ActivityListItem } from '../../components/ActivityListItem'
// import { RootState } from '../../redux/store'
import { Get } from '../../requests/newRequest'
import { useUser } from '../../context/userContext'
import { useAuth } from '../../context/authContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { HomeTabsParamList } from '../../navigation/HomeStack'
import { useActivities } from '../../context/activitiesContext'
import { useSync } from '../../hooks/useSync'
import { useSettings } from '../../context/settingsContext'

type JournalScreenNavigationProp = StackNavigationProp<
    HomeTabsParamList,
    'Journal'
>
type JournalScreenRouteProp = RouteProp<HomeTabsParamList, 'Journal'>

type JournalScreenProps = {
    navigation: JournalScreenNavigationProp
    route: JournalScreenRouteProp
}

export const JournalScreen: FC<JournalScreenProps> = ({ navigation }) => {
    const [isActive, setIsActive] = useState(false)

    const { sorted } = useActivities()

    const visible = sorted.filter(a => !a?.system?.awaitsDelete)

    const { fetchActivities } = useSync()

    useEffect(() => {
        if (!isActive) return
        // when the screen is active, we run fetch on interval
        const intervalId = setInterval(
            () => fetchActivities(),
            listUpdateInterval,
        )

        return () => {
            clearInterval(intervalId)
        }
    }, [isActive])

    useEffect(() => {
        const focusUnsub = navigation.addListener('focus', () => {
            fetchActivities()
            setIsActive(true)
        })
        const blurUnsub = navigation.addListener('blur', () => {
            setIsActive(false)
        })

        return () => {
            focusUnsub()
            blurUnsub()
        }
    }, [])

    const renderItem = ({ item }) => {
        return <ActivityListItem activity={item} navigation={navigation} />
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <FlatList
                style={styles.list}
                data={visible}
                contentContainerStyle={{ paddingBottom: 30 }}
                overScrollMode={'always'}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

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
