import { IActivityClass } from '../classes/Activity'

export default function syncActivities(
    activities: IActivityClass[],
    id: string,
    access_token: string,
) {
    return Promise.all([
        ...activities.map(activity => {
            if (!activity.synced()) {
                return activity.sync(id, access_token)
            }
        }),
    ])
}
