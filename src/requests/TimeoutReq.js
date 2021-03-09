export async function fetchWithTimeout(req, timeout = 5000) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    req.signal = controller.signal
    return new Promise((resolve, reject) => {
        fetch(req)
            .then(res => {
                clearTimeout(timeoutId)
                resolve(res)
            })
            .catch(err => {
                clearTimeout(timeoutId)
                reject(err)
            })
    })
}
