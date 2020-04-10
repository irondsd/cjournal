export default function timeoutFetch(url, options, timeout = 5000) {
    let timeout_err = {
        ok: false,
        status: 408,
        message: 'Request timeout',
    }
    return new Promise(function(resolve, reject) {
        fetch(url, options)
            .then(resolve, reject)
            .catch(() => {
                console.log('Timeout!')
            })
        setTimeout(reject.bind(null, timeout_err), timeout)
    })
}
