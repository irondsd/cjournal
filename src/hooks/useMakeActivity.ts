import { useState } from 'react'
import { IActivity, IAData } from '../classes/Activity'
import { ActivityTypes } from '../constants'
import { useUser } from '../context/userContext'
import objectId from '../helpers/objectId'
import timestamp from '../helpers/timestamp'

type Provided = Omit<Partial<IActivity>, 'activity_type'> & {
    activity_type: ActivityTypes
}

export const useMakeActivity = (
    provided: Provided,
): [
    activity: IActivity,
    updateActivity: (values: Partial<IActivity>) => void,
    updateData: (values: Partial<IAData>) => void,
] => {
    const { _id, idinv } = useUser()
    const [data, setData] = useState<IAData>({})
    const [activity, setActivity] = useState<IActivity>({
        _id: objectId(),
        user: _id,
        idinv: idinv,
        time_started: timestamp(),
        updated_at: timestamp(),
        data: data,
        ...provided,
    })

    const updateActivityValue = (values: Partial<IActivity>) => {
        setActivity({
            ...activity,
            ...values,
        })
    }
    const updateDataValue = (values: Partial<IAData>) => {
        setData({
            ...data,
            ...values,
        })
    }

    return [{ ...activity, data }, updateActivityValue, updateDataValue]
}
