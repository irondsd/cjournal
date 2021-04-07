import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    StatusBar,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateActivity } from '../../redux/actions'
import { strings } from '../../localization'
import { paths, width } from '../../constants'
import { IAData } from '../../classes/Activity'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
// @ts-ignore: svg import error
import FeelingGood from '../../resources/svg/positiveemotions.svg'
// @ts-ignore: svg import error
import FeelingNormal from '../../resources/svg/normal.svg'
// @ts-ignore: svg import error
import FeelingBad from '../../resources/svg/negativeemotions.svg'

const smileSize = width / 2.5

export const SleepFinishScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()

    const submit = (feeling: IAData['feeling']) => {
        const activity = navigation.state?.params?.activity
        activity.data.feeling = strings[feeling]
        dispatch(updateActivity(activity, activity))
        navigation.navigate(paths.Home)
    }

    const smileProps = {
        style: styles.img,
        width: smileSize,
        height: smileSize,
        fill: '#ffffff88',
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <Text style={styles.question}>{strings.SleepFinishQuestion}</Text>
            <View style={styles.feelingsBox}>
                <TouchableOpacity
                    onPress={() => {
                        submit('bad')
                    }}>
                    <FeelingBad {...smileProps} />
                    <Text style={styles.text}>{strings.Bad}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('normal')
                    }}>
                    <FeelingNormal {...smileProps} />
                    <Text style={styles.text}>{strings.Normal}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('good')
                    }}>
                    <FeelingGood {...smileProps} />
                    <Text style={styles.text}>{strings.Good}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

SleepFinishScreen.navigationOptions = () => {
    return { header: null, headerLeft: null }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
        backgroundColor: 'black',
        padding: '10%',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff88',
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        color: '#ffffff88',
        marginBottom: '20%',
    },
    feelingsBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    img: {
        marginLeft: 10,
        marginRight: 10,
    },
})
