export default function syncActivities(activities, id, api_key) {
    return Promise.all([
        ...activities.map(activity => {
            if (!activity.synced()) {
                return new Promise((resolve, reject) => {
                    activity
                        .sync(id, api_key)
                        .then(() => {
                            // sync activity success
                            resolve()
                        })
                        .catch(() => {
                            // sync activity fail
                            reject()
                        })
                })
            }
        }),
    ])
}
