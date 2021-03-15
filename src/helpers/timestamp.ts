export default function timestamp(date = new Date()): number {
    return parseInt((date.getTime() + '').substring(0, 10))
}
