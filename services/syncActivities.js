export default function syncActivities(activities, id, access_token) {
    return Promise.all([
        ...activities.map(activity => {
            if (!activity.synced()) {
                return new Promise((resolve, reject) => {
                    activity
                        .sync(id, access_token)
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
