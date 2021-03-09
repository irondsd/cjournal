export default function syncActivities(activities, id, access_token) {
    return Promise.all([
        ...activities.map(activity => {
            if (!activity.synced()) {
                return activity.sync(id, access_token)
            }
        }),
    ])
}
