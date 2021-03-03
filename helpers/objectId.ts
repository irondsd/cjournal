export default function objectId(): string {
    return (
        hex(Date.now() / 1000) +
        ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
    )
}

function hex(value: number): string {
    return Math.floor(value).toString(16)
}
