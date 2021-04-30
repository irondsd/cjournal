export const objectCleanUp = (data: any) => {
    if (typeof data !== 'object') return data
    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            delete data[key]
        }
    })
    return data
}
