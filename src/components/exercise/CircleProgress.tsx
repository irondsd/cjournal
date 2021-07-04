import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { width } from '../../constants'
type CircleProgressProps = {
    progress: number
    children: any
}

export const CircleProgress: FC<CircleProgressProps> = ({
    progress,
    children,
}) => {
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={width / 1.3}
                width={3}
                fill={progress}
                style={{ transform: [{ scaleX: -1 }] }}
                rotation={0}
                tintColor={'#00000033'}
                lineCap="round"
                backgroundColor="#00000007">
                {() => children}
            </AnimatedCircularProgress>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})
