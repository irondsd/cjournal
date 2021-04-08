import { Alert } from 'react-native'
import { strings } from '../localization'

export const terminateAlarm = (
    message: string,
    onOk: () => void,
    onCancel?: () => void,
) => {
    Alert.alert(
        `${strings.Terminate}?`,
        message,
        [
            {
                text: strings.Cancel,
                style: 'cancel',
                onPress: onCancel,
            },
            {
                text: strings.Terminate,
                onPress: onOk,
            },
        ],
        { cancelable: false },
    )
}
