export async function TimeoutRequest(
    req: any,
    timeout: number = 5000,
): Promise<Response> {
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    const controller = new AbortController()

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
