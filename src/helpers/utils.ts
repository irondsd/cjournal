export const objectCleanUp = <T>(data: T): T => {
    if (!Object.isObject(data)) return data
    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            delete data[key]
        }
    })
    return data
}
