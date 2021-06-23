import { useState } from 'react'
import { IActivity, IAData } from '../classes/Activity'

export const useActivity = (
    provided?: IActivity,
): [
    activity: IActivity,
    updateActivity: (key: string, value: any) => void,
    updateData: (key: string, value: any) => void,
] => {
    const [activity, setActivity] = useState<IActivity>(provided)
    const [data, setData] = useState<IAData>({})

    const updateActivityValue = (key: string, value: any) => {
        setActivity({
            ...activity,
            [key]: value,
        })
    }
    const updateDataValue = (key: string, value: any) => {
        setData({
            ...data,
            [key]: value,
        })
    }

    return [{ ...activity, data }, updateActivityValue, updateDataValue]
}
