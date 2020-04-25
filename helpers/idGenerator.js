import timestamp from './timestamp'

export default user_id => {
    let id = `${user_id}` + timestamp() + getRandomInt()
    return id
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(9999))
}
