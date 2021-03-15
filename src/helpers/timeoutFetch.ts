export default function timeoutFetch(
    url: string,
    options: any,
    timeout = 5000,
) {
    let timeout_err = {
        ok: false,
        status: 408,
        message: 'Request timeout',
    }
    return new Promise(function (resolve, reject) {
        fetch(url, options)
            .then(resolve, reject)
            .catch(() => {
                // console.log('Fetch timeout')
            })
        setTimeout(reject.bind(null, timeout_err), timeout)
    })
}
