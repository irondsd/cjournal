export async function fetchWithTimeout(req, timeout = 5000) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    req.signal = controller.signal
    return new Promise((resolve, reject) => {
        fetch(req)
            .then(res => {
                clearTimeout(id)
                resolve(res)
            })
            .catch(err => {
                clearTimeout(id)
                reject(err)
            })
    })
}
