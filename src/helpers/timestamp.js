export default function timestamp(date = new Date()) {
    return parseInt((date.getTime() + '').substring(0, 10))
}
