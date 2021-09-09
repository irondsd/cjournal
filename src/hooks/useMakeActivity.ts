import { useState } from 'react'
import { Activity, Data } from '../classes/Activity'
import { ActivityTypes } from '../constants'
import { useUser } from '../context/userContext'
import objectId from '../helpers/objectId'
import timestamp from '../helpers/timestamp'

type Provided = Omit<Partial<Activity>, 'activity_type'> & {
    activity_type: ActivityTypes
}

export const useMakeActivity = (
    provided: Provided,
): [
    activity: Activity,
    updateActivity: (values: Partial<Activity>) => void,
    updateData: (values: Partial<Data>) => void,
] => {
    const { _id, idinv } = useUser()
    const [data, setData] = useState<Data>({})
    const [activity, setActivity] = useState<Activity>({
        _id: objectId(),
        user: _id,
        idinv: idinv,
        time_started: timestamp(),
        updated_at: timestamp(),
        data: data,
        ...provided,
    })

    const updateActivityValue = (values: Partial<Activity>) => {
        setActivity({
            ...activity,
            ...values,
        })
    }
    const updateDataValue = (values: Partial<Data>) => {
        setData({
            ...data,
            ...values,
        })
    }

    return [{ ...activity, data }, updateActivityValue, updateDataValue]
}
