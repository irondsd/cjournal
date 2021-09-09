import { Activity } from '../classes/Activity'
import { useActivities } from '../context/activitiesContext'
import { useUser } from '../context/userContext'
import timestamp from '../helpers/timestamp'
import { ActivityTypes } from '../constants'
import objectId from '../helpers/objectId'
import { useGeolocation } from './useGeolocation'
import { showToast } from '../services/toast'
import { strings } from '../localization'

export const useInitActivity = () => {
    const { activityAdd } = useActivities()
    const { _id: user, idinv } = useUser()
    const { requestGeolocation } = useGeolocation()

    const initSave = (activity_type: ActivityTypes) => {
        const activity: Activity = {
            _id: objectId(),
            activity_type,
            time_started: timestamp(),
            updated_at: timestamp(),
            user: user!,
            idinv: idinv,
            data: {},
        }

        activityAdd!(activity)
    }

    const initWithLocationSave = async (activity_type: ActivityTypes) => {
        showToast(strings.ReqLocation)
        return requestGeolocation().then(res => {
            const { latitude, longitude } = res.coords
            const activity: Activity = {
                _id: objectId(),
                activity_type,
                time_started: timestamp(),
                updated_at: timestamp(),
                user: user!,
                idinv: idinv,
                data: { locations: [{ latitude, longitude }] },
            }

            activityAdd!(activity)
        })
    }

    return { initSave, initWithLocationSave }
}
